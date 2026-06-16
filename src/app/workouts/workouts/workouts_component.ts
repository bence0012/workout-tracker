import { Component, Input  } from '@angular/core';
import { WorkoutComponent } from '../workout/workout/workout_component';
import { ExerciseType, WorkoutData } from '../types';
import { BackendService } from '../../backend-service';




@Component({
  selector: 'app-workouts',
  imports: [WorkoutComponent],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class WorkoutsComponent {  
  @Input({required: true}) types!: ExerciseType[]

  workouts!: WorkoutData[]
  isAddingWorkout = false
  selectedWorkoutId? : string

  constructor(private backend: BackendService){}

  ngOnInit(){
    this.workouts = this.backend.workouts
  }
  
  
  newWorkout(){
    let id = this.backend.add_workout()
    this.selectedWorkoutId = id
    console.table(this.types)
  }

  clickWorkout(id: string){
    this.selectedWorkoutId=id
  }

}
