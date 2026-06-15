import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { BackendService } from '../../../backend-service';
import { ExerciseType } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-types-component',
  imports: [FormsModule],
  templateUrl: './exercise-types-component.html',
  styleUrl: './exercise-types-component.css',
})
export class ExerciseTypesComponent {
  @Input({required: true}) exerciseType!: ExerciseType | null
  @Input({required: true}) types!: ExerciseType[]
  @Output() addTypeToExercise = new EventEmitter<ExerciseType>()

  constructor(){}

  addType(type_name: string){
    let type = this.types.find(value => value.name == type_name)
    if (type != undefined){
      console.table(type)
      this.addTypeToExercise.emit(type)
    }
  }

  getType(){
    if((this.exerciseType == undefined) || (this.exerciseType == null))
      return ''
    return this.exerciseType.name
  }
}
