import { ApplicationRef, Component, signal, Signal,  } from '@angular/core';
import { WorkoutComponent } from '../workout/workout/workout_component';
import { MuscleGroup, WorkoutData } from '../types';
import { HttpClient } from '@angular/common/http';
import { workerData } from 'node:worker_threads';
import { FormField } from "@angular/forms/signals";
import { BackendService } from '../../backend-service';




@Component({
  selector: 'app-workouts',
  imports: [WorkoutComponent],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class WorkoutsComponent {  
  workouts!: WorkoutData[]
  isAddingWorkout = false
  selectedWorkoutId? : string

  constructor(private backend: BackendService){
    this.workouts = backend.workouts
  }

  newWorkout(){
    let id = this.backend.add_workout()
    this.selectedWorkoutId = id
  }

  clickWorkout(id: string){
    this.selectedWorkoutId=id
  }
}
