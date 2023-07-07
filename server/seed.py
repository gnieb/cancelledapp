from app import app
from config import db
from models import User, Plan, PUInstance

def seed_data():

    User.query.delete()
    Plan.query.delete()
    PUInstance.query.delete()
  

   

    db.create_all()

    print("seeding users")





if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()
