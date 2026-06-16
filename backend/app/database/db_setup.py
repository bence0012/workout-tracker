import datetime

import sqlalchemy

from sqlalchemy.orm import sessionmaker

from backend.app.database.model import Base, ExerciseDetail, Exercise, ExerciseType, Workout, MuscleGroup

DATABASE_URL = "postgresql://myuser:mypassword@localhost/mydatabase"
engine = sqlalchemy.create_engine(DATABASE_URL)
Base.metadata.drop_all(engine)
Base.metadata.create_all(bind=engine)
session = sessionmaker(bind=engine)()
session.begin()

groups = []
for item in ['Chest', 'Leg', 'Shoulder', 'Arm', 'Back', 'Belly']:
    groups.append(MuscleGroup(name=item))

types = [ExerciseType(id=None, name='barbell row', image='', muscle_group='Back'),
         ExerciseType(id=None, name='bench press', image='', muscle_group='Chest')]
for i in range(1, 4):
    details_1 = [ExerciseDetail(id=None, sets=1*i, reps=10, weight=60),
                 ExerciseDetail(id=None, sets=2*i, reps=10, weight=30),]
    details_2 = [ExerciseDetail(id=None, sets=1*i, reps=10, weight=60),
                 ExerciseDetail(id=None, sets=2*i, reps=10, weight=30),]

    exercises = [Exercise(id=None, exercise_type=types[0], details=details_1),
                 Exercise(id=None, exercise_type=types[1], details=details_2)]

    workout = Workout(id=None, date=datetime.datetime.now(), notes='', main_muscle_groups=groups, exercises=exercises)
    session.add(workout)

session.commit()
session.close()
