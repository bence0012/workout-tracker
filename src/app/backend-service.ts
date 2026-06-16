import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise, ExerciseType, MuscleGroup, WorkoutData, ExerciseDetail } from './workouts/types';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private workoutData!: WorkoutData[]
  private muscleGroupData!: MuscleGroup[]
  private exerciseTypesData!: ExerciseType[]

  private exercise_max_id: number = 0
  private workout_max_id: number = 0
  private detail_max_id: number = 0


  private backend_ip: string = 'http://192.168.0.15:8000'

  constructor(private http: HttpClient){
  }

  public fetchData(){
    this.http.get<WorkoutData[]>(this.backend_ip + '/workouts/',).subscribe((data) => {
      this.workoutData = data
      this.detail_max_id = Math.max(...this.workouts.map(workout => Math.max(...workout.exercises.map(exercise => Math.max(...exercise.details.map(details => parseInt(details.id)))))))+1
      if (this.detail_max_id<0)
        this.detail_max_id = 0
      this.exercise_max_id = Math.max(...this.workouts.map(workout => Math.max(...workout.exercises.map(exercise => parseInt(exercise.id)))))+1
      if (this.exercise_max_id<0)
        this.exercise_max_id = 0
      this.workout_max_id = Math.max(...this.workouts.map(ob => parseInt(ob.id)))+1
      if (this.workout_max_id<0)
        this.workout_max_id = 0
    })
    this.http.get<MuscleGroup[]>(this.backend_ip + '/groups/',).subscribe((data) => {
      this.muscleGroupData = data
    })
    this.http.get<ExerciseType[]>(this.backend_ip + '/exercise_types/',).subscribe((data) => {
      this.exerciseTypesData = data
    })
  }

  public get workouts(){
    return this.workoutData
  }

  public get muscleGroups(){
    return this.muscleGroupData
  }

  public get exerciseTypes(){
    return this.exerciseTypesData
  }

  public add_workout(){
    let workout = {
      id: String(Math.max(...this.workouts.map(ob => parseInt(ob.id)))+1),
      date: new Date(),
      exercises: [],
      main_muscle_groups: [],
      notes: ''
    }
    this.http.post<WorkoutData>(this.backend_ip + '/workouts/', workout).subscribe((data) => {
      console.log(data)
    })
    this.workoutData.unshift(workout)
    return workout.id
  }

  public add_muscle_group_to_workout(group: MuscleGroup, workout: WorkoutData){
    if(!workout.main_muscle_groups.find(ob =>ob.name == group.name)){
      workout.main_muscle_groups.push(group)
      this.http.put(this.backend_ip + `/workouts/${workout.id}/muscle_groups`, group)
                .subscribe((data) => {console.log(data)})
    }
  }

  public remove_muscle_group_from_workout(group: MuscleGroup, workout: WorkoutData){
    workout.main_muscle_groups = workout.main_muscle_groups.filter(ob => ob != group)
    this.http.delete(this.backend_ip + `/workouts/${workout.id}/muscle_groups`, {body: group})
                .subscribe((data) => {console.log(data)})
  }

  public add_new_exercise_to_workout(workout: WorkoutData){
    let asd: Exercise = {
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

  public change_type_of_exercise(exercise: Exercise, exercise_type: ExerciseType){
    this.http.patch(this.backend_ip + `/exercise/${exercise.id}/exercise_type/${exercise_type.id}`, {})
                .subscribe((data) => {console.log(data)})
      exercise.exercise_type = exercise_type
  }

  public add_detail_to_exercise(exercise: Exercise){
    let detail: ExerciseDetail = {
      id: String(this.detail_max_id + 1),
      sets: 0,
      reps: 0,
      weight: 0
    }
    this.http.post(this.backend_ip + `/exercise/${exercise.id}/detail/`, detail)
                .subscribe((data) => {
                  console.log(data)
                  this.detail_max_id += 1
                })
    exercise.details.push(detail)
    return String(this.detail_max_id + 1)
  }

  public remove_detail_from_exercise(exercise: Exercise, detail: ExerciseDetail){
    this.http.delete(this.backend_ip + `/detail/${detail.id}`)
                .subscribe((data) => {
                  console.log(data)
                  this.detail_max_id -= 1
                })
    exercise.details = exercise.details.filter(ob => ob != detail)
  }

  public update_detail(detail: ExerciseDetail){
    this.http.put(this.backend_ip + `/detail/`, detail)
                  .subscribe((data) => {console.log(data)})
  }

  public create_new_exercise_type(name:string, muscleGroup: string){
    let newType: ExerciseType = {
      id: String(Math.max(...this.exerciseTypes.map(ob => parseInt(ob.id)))+1),
      name: name,
      muscle_group: muscleGroup,
      image:''
    }
    console.table(newType)
    this.http.post(this.backend_ip + `/exercise_type/`, newType)
              .subscribe((data) => {
                console.log(data)
                
              })
    this.exerciseTypes.push(newType)
  }
  public deleteExerciseType(typeId: string){
    this.http.delete(this.backend_ip + `/exercise_type/${typeId}`).subscribe((data) => {
                console.log(data)
              })
    this.exerciseTypesData = this.exerciseTypesData.filter(ob => ob.id != typeId)
    
  }
}
