from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class WorkoutModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    date: datetime
    notes: Optional[str]
    main_muscle_groups: str
    exercizes: List["ExercizeModel"]


class ExercizeModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    exercize_type: "ExercizeTypeModel"
    details: List["ExercizeDetailModel"]


class ExercizeTypeModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    image: Optional[str]
    muscle_group: str


class ExercizeDetailModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sets: int
    reps: int
    weight: int
