from fastapi import APIRouter

from ..database.database import db
from .. database.model import Workout
from .model import ExerciseDetailModel, ExerciseModel, ExerciseTypeModel, MuscleGroupModel, WorkoutModel

Router = APIRouter()


@Router.get('/workouts/')
def get_wourkouts():
    workouts = db.get_all_workouts()
    return workouts


@Router.get('/groups/')
def get_muscle_groups():
    muscle_groups = db.get_all_muscle_groups()
    return muscle_groups


@Router.get('/exercise_types/')
def get_exercise_types():
    types = db.get_all_exercise_types()
    return types


@Router.post('/workouts/')
def post_workout(workout: WorkoutModel):
    db.create_workout(Workout(**workout.model_dump()))


@Router.put('/workouts/{workout_id}/muscle_groups')
def put_workout_muscle_groups(workout_id: int,
                              muscle_group: MuscleGroupModel):
    db.add_workout_muscle_group(workout_id, muscle_group.name)


@Router.delete('/workouts/{workout_id}/muscle_groups')
def delete_workout_muscle_groups(workout_id: int,
                                 muscle_group: MuscleGroupModel):
    db.remove_workout_muscle_group(workout_id, muscle_group.name)


@Router.put('/workouts/{workout_id}/exercise')
def put_workout_exercise(workout_id: int,
                         exercise: ExerciseModel):
    db.add_workout_exercise(workout_id, exercise)


@Router.delete('/exercise/{exercise_id}')
def delete_exercise(exercise_id: int):
    db.remove_exercise(exercise_id)


@Router.post('/exercise_type/')
def post_excercise_type(type: ExerciseTypeModel):
    db.cereate_exercise_type(**type.model_dump())


@Router.patch('/exercise/{exercise_id}/exercise_type/{exercise_type_id}')
def patch_exercise_type(exercise_id: int, exercise_type_id: int):
    db.change_type_of_exercise(exercise_id, exercise_type_id)


@Router.post('/exercise/{exercise_id}/detail/')
def post_excercise_detail(exercise_id: int, detail: ExerciseDetailModel):
    db.add_exercise_detail(exercise_id, detail)


@Router.put('/detail/')
def put_excercise_detail(detail: ExerciseDetailModel):
    db.change_detail(detail)


@Router.delete('/detail/{detail_id}')
def delete_excercise_detail(detail_id: int):
    db.delete_detail(detail_id)


@Router.delete('/exercise_type/{type_id}')
def delete_excercise_type(type_id: int):
    db.delete_type(type_id)
