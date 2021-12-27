# Import the required libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from flask_mail import Mail
from config import config

# Create various application instances
# Order matters: Initialize SQLAlchemy before Marshmallow
db = SQLAlchemy()
ma = Marshmallow()
cors = CORS()
mail = Mail()

def create_app(config_name):
    """Application-factory pattern"""
    app = Flask(__name__)

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # Initialize extensions
    # To use the application instances above, instantiate with an application:
    db.init_app(app)
    ma.init_app(app)
    cors.init_app(app)
    mail.init_app(app)
    
    return app
