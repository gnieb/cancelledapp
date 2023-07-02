from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import Plan, User, PUInstance

class Home(Resource):
    def get(self):
        return make_response("YEEHAW")




api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
