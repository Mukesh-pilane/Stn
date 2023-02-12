from flask import Blueprint, request
from utils import verify_token

user_bp = Blueprint('user', __name__)

@user_bp.route('/users/gSigin', methods=['GET'])
@verify_token
def googleSigin(userData):
    from app import mysql
    cursor = mysql.connection.cursor()

    try:
            cursor.execute(f"SELECT * FROM `user`  WHERE uid={userData.get('sub')}")
    except Exception  as e :
            print(f'verify function :{e}')
    else:
        print('executed')
    if len(cursor.fetchall())==0:
                    try:
                         cursor.execute(f"INSERT INTO `user` (`uid`) VALUES ({userData.get('sub')})")
                         mysql.connection.commit()
                         cursor.close()
                    except Exception as e :
                         print(f'verify function :{e}')        
    return {"uinfo": userData}
    