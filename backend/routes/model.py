from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class WorkoutModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int]
    date: datetime
    notes: Optional[str]
    main_muscle_groups: List['MuscleGroupModel']
    exercises: List["ExerciseModel"]


class ExerciseModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    exercise_type: Optional["ExerciseTypeModel"]
    details: List["ExerciseDetailModel"]


class ExerciseTypeModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    image: Optional[str]
    muscle_group: str


class ExerciseDetailModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sets: int
    reps: int
    weight: int


class MuscleGroupModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
