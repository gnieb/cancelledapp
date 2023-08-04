from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import Plan, User, PUInstance
from sqlalchemy.exc import IntegrityError
import jwt


def JWT_Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        decoded_token = request.headers.get('Authorization').split(' ')[1]
        try:
            jwt.decode(
                jwt = decoded_token,
                key = SECRET_KEY,
                algorithms = ['HS256'],
            )
        except:
            return make_response({"error": "Authentication failed - Token Error"},401)

        return func(*args, **kwargs)

    return wrapper_func

class Home(Resource):
    def get(self):
        return make_response("YEEHAW")

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
        sub_user = request.get_json().get('username').lower()
        sub_pass = request.get_json().get('password')
        sel_user = User.query.filter(User.username == sub_user.one_or_none())
        if sel_user == None or sel_user.authenticate(sub_pass) == False:
            return make_response({"error": "Invalid Username or Password"}, 401)
        else:
            token = jwt.encode(
                {
                    'user_id': sel_user.id},
                    key = SECRET_KEY,
                    algorithm = 'HS256'
            )
            response = make_response(
                sel_user.to_dict(
                only = ('username', 'email')),
                201,
                {'Authorization': f'Bearer {token}'}
            )
        return response

api.add_resource(Home, '/')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
