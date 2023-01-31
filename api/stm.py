
from flask import Flask,render_template,request,jsonify
from Auth import verify_token
from flask_mysqldb import MySQL
from flask_cors import CORS
from summarizer import summarize

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


UDetails=()
app.config['MYSQL_HOST']="localhost"
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']=""
app.config['MYSQL_DB']="stm"
mysql=MySQL(app)
# cursor = mysql.connection.cursor()

@app.route("/verify", methods = ['GET', 'POST', 'DELETE'])      
def verify():
     token = request.headers.get('Authorization')
     if verify_token(token) :
          if(request.method == 'GET'):
               return jsonify({"uinfo": verify_token(token)})  


@app.route("/summary", methods = ['GET', 'POST', 'DELETE'])      
def summary():
     token = request.headers.get('Authorization')
     uinfo = verify_token(token)
     if verify_token(token) :
          if(request.method == 'POST'):
               content_type = request.headers.get('Content-Type')
               if (content_type == 'application/json'):
                    trancript = request.json
                    return summarize(trancript)
               else:
                    return 'Content-Type not supported!'



               
if __name__=="__main__":
    app.run(debug=True)