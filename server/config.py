from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_session import Session
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.json.compact = False
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

CORS(app, supports_credentials=True, allow_headers=['Content-Type', 'session'])
Session(app)
app.secret_key = b'\x9b#\xf1\x914K\x9d\xa3\xbfD\xbb\x9d\x1eO\xd3\xa7'

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)

api = Api(app)