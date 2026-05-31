import datetime
from typing import List
from typing import Optional
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime, ForeignKey, func


class Base(DeclarativeBase):
    pass


class Workout(Base):
    __tablename__ = "workout"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    notes: Mapped[Optional[str]]
    main_muscle_groups: Mapped[str]

    exercizes: Mapped[List["Exercize"]] = relationship(back_populates="workout")


class Exercize(Base):
    __tablename__ = "exercize"

    id: Mapped[int] = mapped_column(primary_key=True)

    exercize_type: Mapped["ExercizeType"] = relationship(back_populates="exercizes")
    exercize_type_id = mapped_column(ForeignKey("exercize_type.id"))

    details: Mapped[List["ExercizeDetail"]] = relationship(back_populates="exercize")

    workout_id = mapped_column(ForeignKey("workout.id"))
    workout: Mapped[Workout] = relationship(back_populates="exercizes")


class ExercizeType(Base):
    __tablename__ = "exercize_type"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    image: Mapped[str]
    muscle_group: Mapped[str]

    exercizes: Mapped[List[Exercize]] = relationship(back_populates="exercize_type", single_parent=True)


class ExercizeDetail(Base):
    __tablename__ = "exercize_detail"

    id: Mapped[int] = mapped_column(primary_key=True)
    sets: Mapped[int]
    reps: Mapped[int]
    weight: Mapped[int]

    exercize_id = mapped_column(ForeignKey("exercize.id"))
    exercize: Mapped[Exercize] = relationship(back_populates="details")
