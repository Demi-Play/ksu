from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

engine = create_engine('sqlite:///instance/apps.db', echo=True)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    
    # Отношение один ко многим с таблицей Comments
    comments = relationship("Comments", back_populates="user")

class Apps(Base):
    __tablename__ = 'apps'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    description = Column(Integer)
    predmet = Column(String)
    image = Column(String)

    # Отношение один ко многим с таблицей Comments
    comments = relationship("Comments", back_populates="app")

class Comments(Base):
    __tablename__ = 'comments'
    
    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'))
    appId = Column(Integer, ForeignKey('apps.id'))
    text = Column(String)
    date = Column(String)
    
    # Отношение к таблице Users
    user = relationship("User", back_populates="comments")
    
    # Отношение к таблице Apps
    app = relationship("Apps", back_populates="comments")

# Создание таблиц в базе данных
Base.metadata.create_all(engine)

# Создание сессии для работы с базой данных
Session = sessionmaker(bind=engine)
session = Session()