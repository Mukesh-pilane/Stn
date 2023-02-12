from flask import request, Blueprint
from utils import verify_token, summarize, translateText
import json

summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summary', methods=['GET', 'POST'])
@verify_token
def summary(userData):
    from app import mysql
    uid = userData.get('sub')
    if(request.method == 'GET'):
               cursor = mysql.connection.cursor()
               json_data = []
               try:
                    cursor.execute(f"SELECT * FROM `summaries` WHERE `uid` = {uid}")
                    row_headers=[x[0] for x in cursor.description] 
                    rv = cursor.fetchall()
                    for result in rv:
                         json_data.append(dict(zip(row_headers,result)))
                    json.dumps(json_data)
                    print(json_data)
               except Exception as e:
                    print(f'error {e}')
               cursor.close()
               return json_data, 200
    if request.method == 'POST':
        cursor = mysql.connection.cursor()
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
                    try:
                         cursor.execute(f"INSERT INTO `summaries` (`uid`, `summary`, `Date`, `transcript`) VALUES ({uid}, '{summarize(request.json['transcript'])}', current_timestamp(), '{request.json['transcript']}')")    
                         mysql.connection.commit()
                         cursor.close()
                    except: 
                         print('not executed')
                    else:    
                         print('executed')
                         return 'succesfull', 200
        else:
                    return 'Content-Type not supported!'

@summary_bp.route('/summary', methods=['GET', 'POST', 'PUT', 'DELETE'])
@verify_token
def summaryByID(userData):
    from app import mysql

    if(request.method == 'GET'):
               cursor = mysql.connection.cursor()
               id = int(request.args['id'])
               json_data = []
               try:
                    cursor.execute(f"SELECT * FROM `summaries` WHERE `sid` = {id}")
                    row_headers=[x[0] for x in cursor.description] 
                    rv = cursor.fetchall()
                    for result in rv:
                         json_data.append(dict(zip(row_headers,result)))
                    json.dumps(json_data)
                    print(json_data)
               except:
                    print('not executed')
               cursor.close()
               return json_data

@summary_bp.route('/summary/translateText', methods=['GET', 'POST', 'PUT', 'DELETE'])
@verify_token       
def translator(userData):
    if(request.method == 'POST'):
               content_type = request.headers.get('Content-Type')
               if (content_type == 'application/json'):
                    transcript = request.json['transcript']
                    summary = request.json['summary']
                    src = request.json['src']
                    dest = request.json['dest']
                    return {
                         "transcript":translateText(transcript, src, dest),
                         "summary":translateText(summary, src, dest)
                    }
