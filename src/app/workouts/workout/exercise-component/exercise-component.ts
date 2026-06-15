import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, ExerciseDetail, ExerciseType } from '../../types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseTypesComponent } from '../exercise-types-component/exercise-types-component';
import { BackendService } from '../../../backend-service';


@Component({
  selector: 'app-exercise-component',
  imports: [FormsModule, ReactiveFormsModule, ExerciseTypesComponent],
  templateUrl: './exercise-component.html',
  styleUrl: './exercise-component.css',
})
export class ExerciseComponent {
  @Input({required: true}) exercise! : Exercise;
  @Input({required: true}) types!: ExerciseType[]
  @Output() delete = new EventEmitter<void>();

  isEditing: string = "none";
  enteredWeight = '';
  enteredReps = '';
  enteredSets = '';

  constructor(private backend: BackendService){}

  clickEdit(id: string){
    this.isEditing=id;
    let exer=this.exercise.details.filter(ob => ob.id === this.isEditing)[0] 
    this.enteredWeight = String(exer.weight)
    this.enteredReps = String(exer.reps)
    this.enteredSets = String(exer.sets)
  }

  submitEdit(){
    let detail=this.exercise.details.filter(ob => ob.id === this.isEditing)[0]
    detail.weight = Number(this.enteredWeight),
    detail.reps = Number(this.enteredReps), 
    detail.sets = Number(this.enteredSets)
    this.backend.update_detail(detail)
    this.isEditing="none";
  }

  onAdd(){
    let id = this.backend.add_detail_to_exercise(this.exercise)
    this.isEditing=id
  }

  onDeleteDetail(detail: ExerciseDetail){
    this.backend.remove_detail_from_exercise(this.exercise, detail)
    if(this.isEditing === detail.id){
      this.isEditing="none"
    }    
  }

  onDeleteExercise(){
    this.delete.emit()
  }

  changeType(exerciseType: ExerciseType){
    this.backend.change_type_of_exercise(this.exercise, exerciseType)
  }
}
