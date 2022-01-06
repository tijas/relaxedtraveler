import os
import json
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app,jsonify,request
from app import create_app, db, ma, cors
from models import User, Journey
#from email import send_email
# Create an application instance
app = create_app('production' if os.environ.get('DYNO') else 'default')

# Define a route to fetch the avaialable articles


@app.route("/", strict_slashes=False)
def test():
	test = {
		"test": 1,
		"wat":"wat"
		}
	return jsonify(test)

@app.route("/register", methods=["POST"])
def register():
	data = request.json
	login_email = data['email']
	login_password = data['password']
	login_username = data['username']
	if login_email!="" and login_password!="" and login_username!="":
		user = User(email=login_email,
					password=login_password,
					username=login_username
					)
		db.session.add(user)
		db.session.commit()
		#token = user.generate_confirmation_token()
		#send_email(login_email, 'Confirm Your Account',
		#			'/confirm', login_username, token)
		return "Registered", 201
	else:
		return "Data not valid", 400

@app.route("/login", methods=["POST"])
def login():
	data = request.json
	login_email = data['email']
	login_password = data['password']
	user = User.query.filter_by(email=login_email).first()
	if user is not None and user.verify_password(login_password):
		response = user.username
		return response, 200
	else:
		return "Data not valid", 400

@app.route("/getuserjourney", methods=["POST"])
def getjourney():
	data = request.json
	print(data)
	user = User.query.filter_by(username=data['name']).first()
	if user is not None:
		journey = Journey.query.filter_by(user_id=user.id).first()
		if journey is not None:
			response = journey.journey
			return response, 200
		else:
			return "No data", 204
	else:
		return "Data not valid", 400

@app.route("/setuserjourney", methods=["POST"])
def setjourney():
	data = request.json
	print(data)
	user = User.query.filter_by(username=data['name']).first()
	if user is not None:
		modifieJourney = Journey.query.filter_by(user_id=user.id).first()
		if modifieJourney is not None:
			modifieJourney.journey = json.dumps(data["journey"])
			db.session.commit()
			return "Updated", 200
		else:
			print(data["journey"])
			journey = Journey()
			journey.user_id = user.id
			journey.journey = json.dumps(data["journey"])
			db.session.add(journey)
			db.session.commit()
			return "Created", 201

	return "User not found", 400

if __name__ == "__main__":
	app.run(debug=True)