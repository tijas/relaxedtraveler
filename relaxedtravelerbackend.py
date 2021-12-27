import os
from flask import current_app,jsonify,request
from app import create_app, db, ma, cors, mail
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

#@app.route("/confirm")
#def confirm(token):
#    if current_user.confirmed:
#        return redirect(url_for('main.index'))
#    if current_user.confirm(token):
#        db.session.commit()
#    return redirect(url_for('main.index'))


if __name__ == "__main__":
	app.run(debug=True)