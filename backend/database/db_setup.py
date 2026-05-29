import sqlalchemy

from model.model import Base

DATABASE_URL = "sqlite:"
engine = sqlalchemy.create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
