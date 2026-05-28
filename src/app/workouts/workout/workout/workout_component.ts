import { Component, Input } from '@angular/core';
import { Exersize, WorkoutData } from '../../types';
import { DatePipe } from '@angular/common';
import { ExerciseComponent } from '../exercise-component/exercise-component';

import { Mgroups } from './groups';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-workout',
  imports: [DatePipe, ExerciseComponent, FormsModule],
  templateUrl: './workout.html',
  styleUrl: './workout.css',
})
export class WorkoutComponent {
  @Input({required:true}) workout!: WorkoutData;
  @Input({ required: true}) selected!: boolean

  MGroups = Mgroups
  selectedGroup = ""

  deleteExercise(ex: Exersize){
    this.workout.exersizes = this.workout.exersizes.filter(ob => ob != ex)
  }

  addExercise(){
    this.workout.exersizes.push({
      excercise_type : {
        name : '',
        image: '',
        muscle_group: ''
      },
      details: []
    })
  }

  addGroup(group:string){
    if(this.workout.main_muscle_groups.indexOf(group) === -1){
      this.workout.main_muscle_groups.push(group)
    }
  }

  removeGroup(item: string){
    this.workout.main_muscle_groups = this.workout.main_muscle_groups.filter(ob => ob != item)
  }

}
