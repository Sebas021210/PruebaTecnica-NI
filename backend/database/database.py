import os
import logging
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.database.schemas import Base
from dotenv import load_dotenv
load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class Database:
    """Class for connecting to the PostgreSQL database."""

    def __init__(self):
        """
        Connects to the PostgreSQL database and creates the engine.
        """
        self.engine = None
        self.Session = None

        self.connect()
        self.Session = sessionmaker(bind=self.engine)
        self.create_tables()

    def connect(self):
        """Connects to the PostgreSQL database and creates an engine."""
        connection_string = os.getenv("DATABASE_URL")
        self.engine = create_engine(connection_string, echo=True)

    def create_tables(self):
        """Creates the tables in the database if they do not exist."""
        Base.metadata.create_all(self.engine)

    def get_session(self):
        """
        Gets a database session.
        :return: Database session
        """
        return self.Session()

    @contextmanager
    def write(self):
        """
        Creates a database session to perform a write operation (INSERT, UPDATE, DELETE) with error handling.
        :return: Database session and status code
        """
        session = self.get_session()
        try:
            yield session
            session.commit()
        except Exception as error:
            logger.error(f"Error during write operation: {error}")
            session.rollback()
            raise
        finally:
            session.close()

    @contextmanager
    def read(self):
        """
        Creates a database session to perform a read operation (SELECT) with error handling.
        :return: Database session
        """
        session = self.get_session()
        try:
            yield session
        except Exception as error:
            logger.error(f"Error during read operation: {error}")
            session.rollback()
        finally:
            session.close()

    def clear(self):
        """
        Drops all tables in the database and recreates them.
        """
        with self.write() as session:
            Base.metadata.drop_all(self.engine)
            Base.metadata.create_all(self.engine)
            logger.info("All tables have been dropped and recreated.")

if __name__ == "__main__":
    db = Database()
    print("Database created and connected successfully.")
