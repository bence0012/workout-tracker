import datetime
from typing import List
from typing import Optional
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime, func


class Base(DeclarativeBase):
    pass


class Workout(Base):
    __tablename__ = "workout"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.utcnow())
    notes: Mapped[Optional[str]]

    main_muscle_groups: Mapped[List["MuscleGroup"]] = relationship(back_populates="workout")
    exersizes: Mapped[List["Exersize"]] = relationship(back_populates="workout")


class MuscleGroup(Base):
    __tablename__ = "muscle_group"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    workout: Mapped[Workout] = relationship(back_populates="muscle_group")


class Exersize(Base):
    __tablename__ = "exersize"

    id: Mapped[int] = mapped_column(primary_key=True)

    exercize_type: Mapped["ExersizeType"] = relationship(back_populates="exersize")
    details: Mapped[List["ExersizeDetail"]] = relationship(back_populates="exersize")
    workout: Mapped[Workout] = relationship(back_populates="exersize")


class ExersizeType(Base):
    __tablename__ = "exersize_type"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    image: Mapped[str]
    muscle_group: Mapped[str]

    exersize: Mapped[Exersize] = relationship(back_populates="exersize_type")


class ExersizeDetail(Base):
    __tablename__ = "exercize_detail"

    id: Mapped[int] = mapped_column(primary_key=True)
    sets: Mapped[int]
    reps: Mapped[int]
    weight: Mapped[int]

    exersize: Mapped[Exersize] = relationship(back_populates="exersize_detail")
