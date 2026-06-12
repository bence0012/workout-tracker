import datetime
from typing import List
from typing import Optional
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, ForeignKey, Table, func


class Base(DeclarativeBase):
    pass


workout_groups = Table(
    "workout_groups",
    Base.metadata,
    Column("workouts", ForeignKey("workout.id"), primary_key=True),
    Column("groups", ForeignKey("muscle_group.name"), primary_key=True),
)


class Workout(Base):
    __tablename__ = "workout"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    notes: Mapped[Optional[str]]

    main_muscle_groups: Mapped[List['MuscleGroup']] = relationship(secondary=workout_groups, back_populates="workouts")

    exercises: Mapped[List["Exercise"]] = relationship(back_populates="workout")


class Exercise(Base):
    __tablename__ = "exercise"

    id: Mapped[int] = mapped_column(primary_key=True)

    exercise_type: Mapped["ExerciseType"] = relationship(back_populates="exercises")
    exercise_type_id = mapped_column(ForeignKey("exercise_type.id"))

    details: Mapped[List["ExerciseDetail"]] = relationship(back_populates="exercise")

    workout_id = mapped_column(ForeignKey("workout.id"))
    workout: Mapped[Workout] = relationship(back_populates="exercises")


class ExerciseType(Base):
    __tablename__ = "exercise_type"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    image: Mapped[str]
    muscle_group: Mapped[str]

    exercises: Mapped[List[Exercise]] = relationship(back_populates="exercise_type", single_parent=True)


class ExerciseDetail(Base):
    __tablename__ = "exercise_detail"

    id: Mapped[int] = mapped_column(primary_key=True)
    sets: Mapped[int]
    reps: Mapped[int]
    weight: Mapped[int]

    exercise_id = mapped_column(ForeignKey("exercise.id"))
    exercise: Mapped[Exercise] = relationship(back_populates="details")


class MuscleGroup(Base):
    __tablename__ = "muscle_group"

    name: Mapped[str] = mapped_column(primary_key=True)

    workouts: Mapped[List[Workout]] = relationship(secondary=workout_groups, back_populates="main_muscle_groups")
