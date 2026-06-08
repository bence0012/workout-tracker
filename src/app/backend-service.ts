import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise, MuscleGroup, WorkoutData } from './workouts/types';
import { max } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private workoutData!: WorkoutData[]
  private muscleGroupData!: MuscleGroup[]

  private exercise_max_id: number = 0

  private backend_ip: string = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient){
    this.http.get<WorkoutData[]>(this.backend_ip + '/workouts/',).subscribe((data) => {
      this.workoutData = data
      this.exercise_max_id = Math.max(...this.workouts.map(workout => Math.max(...workout.exercises.map(exercise => parseInt(exercise.id)))))+1
    })
    this.http.get<MuscleGroup[]>(this.backend_ip + '/groups/',).subscribe((data) => {
      this.muscleGroupData = data
    })
  }

  public get workouts(){
    return this.workoutData
  }

  public get muscleGroups(){
    return this.muscleGroupData
  }

  public add_workout(){
    let workout = {
      id: String(Math.max(...this.workouts.map(ob => parseInt(ob.id)))+1),
      date: new Date(),
      exercises: [],
      main_muscle_groups: [],
      notes: ''
    }
    this.http.post<WorkoutData>('http://127.0.0.1:8000/workouts/', workout).subscribe((data) => {
      console.log(data)
    })
    this.workoutData.unshift(workout)
    return workout.id
  }

  public add_muscle_group_to_workout(group: MuscleGroup, workout: WorkoutData){
    if(!workout.main_muscle_groups.find(ob =>ob.name == group.name)){
      workout.main_muscle_groups.push(group)
      this.http.put(this.backend_ip + `workouts/${workout.id}/muscle_groups`, group)
                .subscribe((data) => {console.log(data)})
    }
  }

  public remove_muscle_group_from_workout(group: MuscleGroup, workout: WorkoutData){
    workout.main_muscle_groups = workout.main_muscle_groups.filter(ob => ob != group)
    this.http.delete(this.backend_ip + `/workouts/${workout.id}/muscle_groups`, {body: group})
                .subscribe((data) => {console.log(data)})
  }

  public add_new_exercise_to_workout(workout: WorkoutData){
    let asd = {
      id: String(this.exercise_max_id + 1),
      exercise_type: null,
      details: []
    }
    this.http.put(this.backend_ip + `/workouts/${workout.id}/exercise`,asd)
                .subscribe((data) => {
                  console.log(data)
                  this.exercise_max_id += 1
                })
    workout.exercises.push(asd)
  }

  public remove_exercise_from_workout(exercise: Exercise, workout: WorkoutData){
    this.http.delete(this.backend_ip + `/exercise/${exercise.id}`)
                .subscribe((data) => {console.log(data)})
    workout.exercises = workout.exercises.filter(ob => ob != exercise)
    this.exercise_max_id
  }
}
