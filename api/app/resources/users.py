from flask import Blueprint
from utils import verify_token


user_bp = Blueprint('user', __name__)

@user_bp.route('/users/gSigin', methods=['GET'])
@verify_token
def googleSigin(userData):
    from app import db
    user_collection = db['users']
    user = user_collection.find_one({"userId": userData.get('sub')})  
    if user is None:
        user_collection.insert_one({"userId": userData.get('sub')})
    return {"uinfo": userData}
    