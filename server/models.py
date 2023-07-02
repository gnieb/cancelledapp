from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
from sqlalchemy.orm import validates
from datetime import datetime

# User —--< u/p >-------plan

# followers = db.Table('followers',
#     db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('followee_id', db.Integer, db.ForeignKey('users.id')))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-puinstances', '-plans')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birth_year = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    puinstances = db.relationship('PUInstance', backref='user' )
    plans = association_proxy('puinstances', 'plan')
    # followers = db.relationship('User', 
    #                             primaryjoin=('followers.c.followee_id == User.id'),
    #                              secondaryjoin=('followers.c.follower_id == User.id'))

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 8:
            raise ValueError('Passwords must be 8 characters or more')
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    

    # @validates('birth_year')
    # def validate_birth_year(self, key, year):
    #     today = datetime.now()
    #     if today    

class Plan(db.Model, SerializerMixin):
    __tablename__ = 'plans'

    serialize_rules = ('-puinstances','-users')

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    puinstances = db.relationship('PUInstance', backref='plan' )
    users = association_proxy('puinstances', 'user')

class PUInstance(db.Model, SerializerMixin):
    # puinstance: plan-user instance, or one instance between a plan and a user
    __tablename__ = 'puinstances'

    serialize_rules = ('-user.puinstances','-plan.puinstances')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    plan_id = db.Column(db.Integer, db.ForeignKey('plans.id'))



