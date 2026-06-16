
from contextlib import contextmanager
from typing import Iterator
from pydantic import TypeAdapter
import sqlalchemy
from sqlalchemy import select, desc, asc
from sqlalchemy.orm import Session, sessionmaker

from ..routes.model import ExerciseDetailModel, ExerciseModel, ExerciseTypeModel, MuscleGroupModel, WorkoutModel

from .model import Base, ExerciseDetail, Exercise, ExerciseType, Workout, MuscleGroup


class Database:

    def __init__(self):
        self.metadata_obj = Base.metadata
        self.engine = sqlalchemy.create_engine("postgresql://myuser:mypassword@192.168.0.15/mydatabase")
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
            asd = sess.query(Exercise).get(exercise_id)
            if asd is not None:
                for detail in asd.details:
                    sess.delete(detail)
                sess.delete(asd)

    def cereate_exercise_type(self, id: int, name: str, image: str, muscle_group: str):
        with self.session() as sess:
            exercise_type = ExerciseType(id=id,
                                         name=name,
                                         image=image,
                                         muscle_group=muscle_group)
            sess.add(exercise_type)

    def change_type_of_exercise(self, exercise_id: int, type_id: int):
        with self.session() as sess:
            exercise = sess.query(Exercise).get(exercise_id)
            exerciseType = sess.query(ExerciseType).get(type_id)
            if exercise is None or exerciseType is None:
                return None
            exercise.exercise_type = exerciseType

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
            querry = select(ExerciseType).order_by(asc('muscle_group'), asc('name'))
            types = sess.scalars(querry).unique().all()
            return TypeAdapter(list[ExerciseTypeModel]).validate_python(types, from_attributes=True)

    def add_exercise_detail(self, exercise_id: int, detail: ExerciseDetailModel):
        with self.session() as sess:
            exercise = sess.query(Exercise).get(exercise_id)
            if exercise is not None:
                exercise.details.append(ExerciseDetail(**detail.model_dump()))

    def delete_detail(self, detail_id: int):
        with self.session() as sess:
            detail = sess.query(ExerciseDetail).get(detail_id)
            if detail is not None:
                sess.delete(detail)

    def change_detail(self, detail_model: ExerciseDetailModel):
        with self.session() as sess:
            detail = sess.query(ExerciseDetail).get(detail_model.id)
            if detail is not None:
                detail.weight = detail_model.weight
                detail.reps = detail_model.reps
                detail.sets = detail_model.sets
     
    def delete_type(self, type_id: int):
        with self.session() as sess:
            exercise_type = sess.query(ExerciseType).get(type_id)
            if exercise_type is not None:
                for exercise in exercise_type.exercises:
                    exercise.exercise_type_id = None
                sess.delete(exercise_type)


db = Database()
