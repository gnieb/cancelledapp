from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import Plan, User, PUInstance
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import jwt
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

# def myKEY():
#     print(f'secret key is: {SECRET_KEY}')


class Home(Resource):
    def get(self):
        return make_response("YEEHAW")

api.add_resource(Home, '/')

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 201)
    
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email = data['email']).first()

        if user:
            return make_response({'error':'sorry looks like this email address is already taken'}, 400)
        
        if user == None:
            try:
                newbie=User(username = data['username'], _password_hash = data['_password_hash'],  email = data['email'])
                newbie.password_hash=newbie._password_hash
                hashed_pass=newbie._password_hash
                new_user=User(  username = data['username'], _password_hash = hashed_pass, email = data['email'],)
                db.session.add(new_user)
                db.session.commit()
                
                token = jwt.encode({'id': new_user.id}, SECRET_KEY )
                return make_response({'token' : token.decode('UTF-8'), 'user': new_user.to_dict()}, 200)
            except:
                return make_response({'error': 'user input invalid'}, 400)
    
api.add_resource(Users, '/users')
            
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email = data['email'].first())

        if not user:
            return make_response({'error' : 'Could Not Verify Identity'}, 401)
        
        if not user and user.authenticate(data['_password_hash']):
            token = jwt.encode({'id': user.id}, SECRET_KEY )

        return make_response({'token' : token.decode('UTF-8'), 'user' : user.to_dict()}, 200)
    
api.add_resource(Login, '/login')



if __name__ == '__main__':
    app.run(port=5555, debug=True)


