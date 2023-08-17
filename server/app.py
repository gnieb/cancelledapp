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

class Signup(Resource):
    def post(self):
        user_attr = ["username", "password", "email"]
        user_obj = {}

        for attr in user_attr:
            user_obj[attr] = request.get_json()[attr]

        try:
            newUser = User(
                username = user_obj[f'{user_attr[0]}'],
                password_hash = user_obj[f'{user_attr[1]}'],
                email = user_obj[f'{user_attr[2]}'],
            )
        
        except ValueError as e:
            return make_response({"Value Error" : f"{e}"}, 400 )
        except KeyError as e:
            return make_response({"Value Error" : f"{e}"}, 400 )
        
        try:
            db.session.add(newUser)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return make_response({
                "Integrity Error": "Sorry this Username is Already Taken - Please Choose Another"
            }, 400 )
        db_user = User.query.filter(User.username == user_obj[f'{user_attr[0]}']).one()
        token = jwt.encode(
            {
                'user_id' : db_user.id },
                SECRET_KEY,
                algorithm='HS256'
        )

        response = make_response(
            newUser.to_dict(
                only = ('username', 'email')),
            201, 
            {'Authorization': f'Bearer{token}'}
            )
        
        return response
            
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

api.add_resource(Signup, '/signup')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


