import { Component, Input } from '@angular/core';
import { Exercise, MuscleGroup, WorkoutData } from '../../types';
import { DatePipe } from '@angular/common';
import { ExerciseComponent } from '../exercise-component/exercise-component';


import { FormsModule } from "@angular/forms";
import { BackendService } from '../../../backend-service';


@Component({
  selector: 'app-workout',
  imports: [DatePipe, ExerciseComponent, FormsModule],
  templateUrl: './workout.html',
  styleUrl: './workout.css',
})
export class WorkoutComponent {
  @Input({required:true}) workout!: WorkoutData;
  @Input({required:true}) selected!: boolean
  MGroups!: MuscleGroup[]
  selectedGroup = ""

  constructor(private backend: BackendService){
    this.MGroups = backend.muscleGroups
  }

  deleteExercise(ex: Exercise){
    this.backend.remove_exercise_from_workout(ex, this.workout)
  }

  addExercise(){
    this.backend.add_new_exercise_to_workout(this.workout)
  }

  addGroup(group: MuscleGroup){
    this.backend.add_muscle_group_to_workout(group, this.workout)
  }

  removeGroup(group: MuscleGroup){
    this.backend.remove_muscle_group_from_workout(group, this.workout)
  }

}
