import { Component } from '@angular/core';
import { WorkoutComponent } from '../workout/workout/workout_component';
import { workouts } from './list'; 
import { Workout } from '../types';



@Component({
  selector: 'app-workouts',
  imports: [WorkoutComponent],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class WorkoutsComponent {

  workouts = workouts
  isAddingWorkout = false
  selectedWorkoutId? : string

  newWorkout(){
    let maxIndex = Math.max(...this.workouts.map(ob => parseInt(ob.id)));
    var work: Workout = new Workout(String(maxIndex+1));
    this.workouts.unshift(work.getData())
    this.selectedWorkoutId = String(maxIndex+1)

  }

  clickWorkout(id: string){
    this.selectedWorkoutId=id
  }
}
