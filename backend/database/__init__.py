from backend.database.database import Database
from backend.database.schemas import Product

def get_db():
    """Get the database session."""
    db = Database()
    session = db.get_session()
    try:
        yield session
    finally:
        session.close()

__all__ = [
    "get_db",
    "Product"
]
