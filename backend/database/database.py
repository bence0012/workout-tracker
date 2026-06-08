
from contextlib import contextmanager
from typing import Iterator
from pydantic import TypeAdapter
import sqlalchemy
from sqlalchemy import select, desc, asc
from sqlalchemy.orm import Session, sessionmaker

from ..routes.model import ExerciseModel, MuscleGroupModel, WorkoutModel

from .model import Base, ExerciseDetail, Exercise, ExerciseType, Workout, MuscleGroup


class Database:

    def __init__(self):
        self.metadata_obj = Base.metadata
        self.engine = sqlalchemy.create_engine("postgresql://myuser:mypassword@localhost/mydatabase")
        self.Session = sessionmaker(bind=self.engine)

    @contextmanager
    def session(self) -> Iterator[Session]:
        session = self.Session()
        try:
            session.begin()
            yield session
        except Exception as e:
            session.rollback()
            session.close()
            raise e
        else:
            session.commit()
            session.close()

    def create_workout(self, workout: Workout):
        with self.session() as sess:
            sess.add(workout)
        return workout

    def add_workout_muscle_group(self, id: int, name: str):
        with self.session() as sess:
            workout = sess.query(Workout).get(id)
            group = sess.query(MuscleGroup).get(name)
            if workout is None or group is None:
                return None
            if group not in workout.main_muscle_groups:
                workout.main_muscle_groups.append(group)

    def remove_workout_muscle_group(self, id: int, name: str):
        with self.session() as sess:
            workout = sess.query(Workout).get(id)
            group = sess.query(MuscleGroup).get(name)
            if workout is None or group is None:
                return None
            if group in workout.main_muscle_groups:
                workout.main_muscle_groups.remove(group)

    def create_exercise(self, workout_id: int, exercise_type_id: int):
        with self.session() as sess:
            exercise = Exercise(id=None,
                                workout_id=workout_id,
                                exercise_type_id=exercise_type_id)
            sess.add(exercise)

    def add_workout_exercise(self, workout_id: int, exercise: ExerciseModel):
        with self.session() as sess:
            workout = sess.query(Workout).get(workout_id)
            if workout is None:
                return None
            exercise_new = Exercise(id=exercise.id)
            workout.exercises.append(exercise_new)

    def remove_exercise(self, exercise_id: int):
        with self.session() as sess:
            sess.query(Exercise).filter(
                Exercise.id == exercise_id).delete(synchronize_session=False)

    def cereate_exercise_type(self, id: int, name: str, image: str, muscle_group: str):
        with self.session() as sess:
            exercise_type = ExerciseType(id=id,
                                         name=name,
                                         image=image,
                                         muscle_group=muscle_group)
            sess.add(exercise_type)

    def cereate_exercise_detail(self, sets: int, reps: int, weight: int, exercise_id: int):
        with self.session() as sess:
            exercise_detail = ExerciseDetail(sets=sets, reps=reps, weight=weight, exercise_id=exercise_id)
            sess.add(exercise_detail)

    def get_all_workouts(self):
        with self.session() as sess:
            query = select(Workout).order_by(desc('date'))
            workouts = sess.scalars(query).unique().fetchmany(20)
            return TypeAdapter(list[WorkoutModel]).validate_python(workouts, from_attributes=True)

    def get_all_muscle_groups(self):
        with self.session() as sess:
            query = select(MuscleGroup).order_by(asc('name'))
            muscle_groups = sess.scalars(query).unique().all()
            return TypeAdapter(list[MuscleGroupModel]).validate_python(muscle_groups, from_attributes=True)

    def get_all_exercise_types(self):
        with self.session() as sess:
            return sess.scalars(select(ExerciseType)).all()

db = Database()
