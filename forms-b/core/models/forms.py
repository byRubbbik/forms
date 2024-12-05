from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from .base import Base


class Form(Base):
    __tablename__ = "forms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    fields = Column(JSONB, nullable=False) 

    owner = relationship("User", back_populates="forms")

    def __repr__(self):
        return f"<User(id={self.user_id}, username={self.title}, role={self.owner})>"
