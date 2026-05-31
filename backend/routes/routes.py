from fastapi import APIRouter
from pydantic import TypeAdapter
from pydantic.json import pydantic_encoder
import json

from database.database import db
from .model import WorkoutModel

Router = APIRouter()


@Router.get('/workouts/')
def get_wourkouts():
    workouts = db.get_all_workouts()
    adapter = TypeAdapter(list[WorkoutModel])
    return json.dumps(adapter.validate_python(workouts, from_attributes=True), default=pydantic_encoder, indent=2)


print(get_wourkouts())
