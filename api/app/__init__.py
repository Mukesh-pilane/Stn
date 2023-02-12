import sys
import os
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD,MYSQL_DB
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), './')))
import resources 

mysql = MySQL()

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'


    # UDetails=()
    # app.config['MYSQL_HOST'] = MYSQL_HOST
    # app.config['MYSQL_USER'] = MYSQL_USER
    # app.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
    # app.config['MYSQL_DB'] = MYSQL_DB
    # mysql=MySQL(app)

    UDetails=()
    app.config['MYSQL_HOST']="localhost"
    app.config['MYSQL_USER']="root"
    app.config['MYSQL_PASSWORD']=""
    app.config['MYSQL_DB']="stm"
    mysql.init_app(app)
    app.register_blueprint(resources.user_bp)
    app.register_blueprint(resources.summary_bp)

    return app
