from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import func


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///task.db"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(50),  nullable=False)
    l_name = db.Column(db.String(50),  nullable=False)
    email = db.Column(db.String(150), nullable=False)
    dob = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10),  nullable=False)
    # education = db.Column(db.String(150), nullable=False)
    # company = db.Column(db.String(150), nullable=False)
    # Experience = db.Column(db.Integer, nullable=True)
    # package = db.Column(db.Integer, nullable=False)
    
@app.route('/')
def test():
    return 'this is test'

@app.route('/new_user', methods=['POST'])
def new_user(data):
    print(data)


with app.app_context():
    db.create_all()

app.run(debug=True, port=5555)
