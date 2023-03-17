import sys
import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import MONGODB_URL
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), './')))
import resources 


client = MongoClient(MONGODB_URL)
db = client["STM"]


def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'



    app.register_blueprint(resources.user_bp)
    app.register_blueprint(resources.summary_bp)

    return app
