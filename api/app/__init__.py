import sys
import os
from flask import Flask

from flask_cors import CORS
from pymongo import MongoClient
from config import MONGODB_URL
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), './')))
import resources 
import datetime


client = MongoClient(MONGODB_URL)
db = client["STM"]
# SESSION_TYPE="filesystem"


def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    # app.secret_key="login"
    # app.config.update(
    # DEBUG=True,
    # SECRET_KEY='userlogin',
    # SESSION_COOKIE_PATH="/"
    # )
    # app.config["SESSION_TYPE"] = "filesystem"

    # app.config.from_object(__name__)
    # Session(app)


    # app.permanent_session_lifetime = datetime.timedelta(days=365)

  



    app.register_blueprint(resources.user_bp)
    app.register_blueprint(resources.summary_bp)

     


    return app
