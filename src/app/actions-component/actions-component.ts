import { Component, outputBinding } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog'
import { NewExerciseTypeComponent } from './new-exercise-type-component/new-exercise-type-component';

@Component({
  selector: 'app-actions-component',
  imports: [],
  templateUrl: './actions-component.html',
  styleUrl: './actions-component.css',
})
export class ActionsComponent {

  constructor(private dialog: MatDialog){}

  onNewExerciseType(){
    let dialogRef = this.dialog.open(NewExerciseTypeComponent, {
      height: '200px',
      width: '400px',
    });
    dialogRef.componentInstance.close.subscribe(undefined => {this.onCancel()})
  }

  onCancel(){
    this.dialog.closeAll()
  }
}

