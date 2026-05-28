import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exersize } from '../../types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-exercise-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './exercise-component.html',
  styleUrl: './exercise-component.css',
})
export class ExerciseComponent {
  @Input({required: true}) exercise! : Exersize;
  @Output() delete = new EventEmitter<void>();

  isEditing: string = "none";
  enteredWeight = '';
  enteredReps = '';
  enteredSets = '';

  constructor(){
    
  }

  clickEdit(id: string){
    this.isEditing=id;
    let exer=this.exercise.details.filter(ob => ob.id === this.isEditing)[0] 
    this.enteredWeight = String(exer.weight)
    this.enteredReps = String(exer.reps)
    this.enteredSets = String(exer.sets)
  }

  submitEdit(){
    let exer=this.exercise.details.filter(ob => ob.id === this.isEditing)[0]
    let index=this.exercise.details.indexOf(exer)
    let asd = {
      id: this.isEditing,
      weight: Number(this.enteredWeight),
      reps: Number(this.enteredReps), 
      sets: Number(this.enteredSets)
    }
    this.exercise.details[index]=asd
    this.isEditing="none";
  }

  onAdd(){
    let maxIndex = String(Math.max(...this.exercise.details.map(ob => parseInt(ob.id)))+1);
    this.exercise.details.push({
      id: maxIndex,
      sets: 0,
      reps: 0,
      weight: 0
    })
    this.isEditing=maxIndex
  }

  onDeleteDetail(id: string){
    this.exercise.details = this.exercise.details.filter(ob => ob.id != id)
    if(this.isEditing === id){
      this.isEditing="none"
    }    
  }

  onDeleteExercise(){
    this.delete.emit()
  }
}
