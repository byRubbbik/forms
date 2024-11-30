from sqlalchemy import Column, Integer, String

from .base import Base


class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(128), nullable=False)
    role = Column(String(20), nullable=False)
    
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, role={self.role})>"
