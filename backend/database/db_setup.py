import sqlalchemy

from model import Base

DATABASE_URL = "postgresql://myuser:mypassword@localhost/mydatabase"
engine = sqlalchemy.create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
