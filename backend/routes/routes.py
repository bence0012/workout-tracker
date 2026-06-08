from fastapi import APIRouter
from pydantic import TypeAdapter
from pydantic.json import pydantic_encoder
import json

from ..database.database import db
from .. database.model import MuscleGroup, Workout
from .model import ExerciseModel, ExerciseTypeModel, MuscleGroupModel, WorkoutModel

Router = APIRouter()


@Router.get('/workouts/')
def get_wourkouts():
    workouts = db.get_all_workouts()
    return workouts


@Router.get('/groups/')
def get_muscle_groups():
    muscle_groups = db.get_all_muscle_groups()
    return muscle_groups


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
def create_excercise_type(type: ExerciseTypeModel):
    db.cereate_exercise_type(**type.model_dump())
