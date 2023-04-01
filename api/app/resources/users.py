from flask import Blueprint

from utils import verify_token
from flask import Flask, request
import requests
import random

user_bp = Blueprint('user', __name__)

# def generate_otp():
#    return str(random.randint(100000, 999999))


@user_bp.route('/users/gSigin', methods=['GET'])
@verify_token
def googleSigin(userData):
    from app import db
    user_collection = db['users']
    user = user_collection.find_one({"userId": userData.get('sub')})  
    if user is None:
        user_collection.insert_one({"userId": userData.get('sub')})
    return {"uinfo": userData}
# @user_bp.route('/send_otp', methods=['POST'])  
# def send_otp():
#     session.permanent = True
#     u_otp = request.json['OTP']
#     otp=int(u_otp)

#     session['userotp']=otp
#     print(session['userotp'])
#     print(session)
#     print(type(otp))
#     return {"u_otp":u_otp}   
# @user_bp.route('/verify_otp', methods=['POST']) 
# def verify_otp():
#      v_otp = request.json['inte']
#      print(v_otp)
#      print(type(v_otp))
#      print(session)
#      use=session.get('userotp')
#      print(use)
#      print(type(use))
    
#     #  print(use)
#     #  print(type(use))

#      if(v_otp==use):
#          print("sucess")
#          return 'opt matched'
#      else:
#          return 'OTP does not match'   
    
   
    

    
