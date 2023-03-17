from flask import request, Blueprint
from utils import verify_token, summarize, translateText
from datetime import datetime
from bson.objectid import ObjectId
from bson.json_util import dumps




summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summary', methods=['GET', 'POST'])
@verify_token
def summary(userData):
    from app import db
    summary_collection = db['summaries']
    uid = userData.get('sub')
    if(request.method == 'GET'):
               data = summary_collection.find({"userId":uid})
               return dumps(data), 200
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
                    data = summary_collection.insert_one({"userId":uid,"summary": summarize(request.json['transcript']), "Date":datetime.strptime("2017-10-13T10:53:53.000Z", "%Y-%m-%dT%H:%M:%S.000Z"), "transcript":request.json['transcript']})
                    return 'succesfull', 200
        else:
                    return 'Content-Type not supported!'

@summary_bp.route('/summarydetail', methods=['GET', 'POST', 'PUT', 'DELETE'])
@verify_token
def summaryByID(userData):
    from app import db
    summary_collection = db['summaries']
    if(request.method == 'GET'):
               sid = ObjectId(request.args['id'])
               data = summary_collection.find_one({'_id': sid})
               return dumps(data), 200

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
