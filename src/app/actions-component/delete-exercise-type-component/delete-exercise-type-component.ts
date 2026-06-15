import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../backend-service';
import { ExerciseType } from '../../workouts/types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-exercise-type-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './delete-exercise-type-component.html',
  styleUrl: './delete-exercise-type-component.css',
})
export class DeleteExerciseTypeComponent {
  exerciseTypes!: ExerciseType[]
  @Output() close = new EventEmitter<ExerciseType[]>()

  selectedTypeId: string = 'no'

  constructor(private backend: BackendService, @Inject(MAT_DIALOG_DATA) private data: any){
    this.exerciseTypes = data.exerciseTypes
  }

  onCancel(){
    this.close.emit(this.backend.exerciseTypes)
  }

  onSubmit(){
    if(this.selectedTypeId != 'no'){
      this.backend.deleteExerciseType(this.selectedTypeId)
      this.close.emit(this.backend.exerciseTypes)
    }
  }

}
