import { Component, EventEmitter, Input, Output, outputBinding } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog'
import { NewExerciseTypeComponent } from './new-exercise-type-component/new-exercise-type-component';
import { DeleteExerciseTypeComponent } from './delete-exercise-type-component/delete-exercise-type-component';
import { BackendService } from '../backend-service';
import { ExerciseType } from '../workouts/types';

@Component({
  selector: 'app-actions-component',
  imports: [],
  templateUrl: './actions-component.html',
  styleUrl: './actions-component.css',
})
export class ActionsComponent {
  @Input({required: true}) types!: ExerciseType[]
  @Output() typesChanged = new EventEmitter<ExerciseType[]>()

  constructor(private dialog: MatDialog){}

  onNewExerciseType(){
    let dialogRef = this.dialog.open(NewExerciseTypeComponent, {
      height: '200px',
      width: '400px',
    });
    dialogRef.componentInstance.close.subscribe(types => {
      this.onCancel(types)
    })
  }

    onDeleteExerciseType(){
    let dialogRef = this.dialog.open(DeleteExerciseTypeComponent, {
      height: '150px',
      width: '300px',
      data: {
        exerciseTypes: this.types
      }
    });
    dialogRef.componentInstance.close.subscribe(types => {
      this.onCancel(types)
    })
  }

  onCancel(types: ExerciseType[]){
    this.dialog.closeAll()

    this.typesChanged.emit(types)
  }

  onAsd(){
    this.typesChanged.emit(this.types)
  }
}

