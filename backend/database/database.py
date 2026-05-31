
from contextlib import contextmanager
import datetime
from typing import Iterator
import sqlalchemy
from sqlalchemy import select, desc
from sqlalchemy.orm import Session, sessionmaker, joinedload
from .model import Base, ExercizeDetail, Exercize, ExercizeType, Workout


class Database:

    def __init__(self):
        self.metadata_obj = Base.metadata
        self.engine = sqlalchemy.create_engine("postgresql://myuser:mypassword@localhost/mydatabase")
        self.Session = sessionmaker(bind=self.engine)()
        self.Session.begin()

    def __del__(self):
        self.Session.close()

    @contextmanager
    def session(self) -> Iterator[Session]:
        try:
            yield self.Session
        except Exception as e:
            self.Session.rollback()
            raise e
        else:
            self.Session.commit()

    def create_workout(self, date: datetime.datetime, notes: str | None = None, main_muscle_groups: str = ''):
        with self.session() as sess:
            workout = Workout(id=None, date=date, notes=notes, main_muscle_groups=main_muscle_groups)
            sess.add(workout)

    def create_exercize(self, workout_id: int, exercize_type_id: int):
        with self.session() as sess:
            exercize = Exercize(id=None, workout_id=workout_id, exercize_type_id=exercize_type_id)
            sess.add(exercize)

    def cereate_exercize_type(self, name=str, image=str, muscle_group=str):
        with self.session() as sess:
            exercize_type = ExercizeType(id=None, name=name, image=image, muscle_group=muscle_group)
            sess.add(exercize_type)

    def cereate_exercize_detail(self, sets: int, reps: int, weight: int, exercize_id: int):
        with self.session() as sess:
            exercize_detail = ExercizeDetail(sets=sets, reps=reps, weight=weight, exercize_id=exercize_id)
            sess.add(exercize_detail)

    def get_all_workouts(self):
        with self.session() as sess:
            return sess.scalars(select(Workout).order_by(desc('date'))).unique().all()

    def get_all_exercize_types(self):
        with self.session() as sess:
            return sess.scalars(select(ExercizeType)).all()


db = Database()
