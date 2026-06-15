import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header-component/header-component';
import { WorkoutsComponent } from './workouts/workouts/workouts_component';
import { ActionsComponent } from './actions-component/actions-component';
import { ExerciseType } from './workouts/types';
import { BackendService } from './backend-service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, WorkoutsComponent, ActionsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('workout-tracker');
  exerciseTypes: ExerciseType[]

  constructor(private backend: BackendService){
    this.exerciseTypes = backend.exerciseTypes
  }

  typesChanged(newTypes: ExerciseType[]){
    console.table(newTypes)
    this.exerciseTypes = newTypes
  }
}
