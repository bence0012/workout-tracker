import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../../backend-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MuscleGroup } from '../../workouts/types';


@Component({
  selector: 'app-new-exercise-type-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-exercise-type-component.html',
  styleUrl: './new-exercise-type-component.css',
})
export class NewExerciseTypeComponent {
  @Output() close = new EventEmitter()
  enteredName = ''
  selectedGroup = 'no'

  muscleGroups: MuscleGroup[]

  constructor(private backend: BackendService){
    this.muscleGroups = backend.muscleGroups
  }

  submitType(){
    if (this.selectedGroup != 'no'){
      this.backend.create_new_exercise_type(this.enteredName, this.selectedGroup)
      this.close.emit()
    }
  }

  onCancel(){
    this.close.emit()
  }
}
