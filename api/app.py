from app import create_app
from flask import session,request
# from flask_session import Session

app = create_app()
app.secret_key="abcghhghg"
@app.route('/send_otp', methods=['POST'])
def send_otp():
        u_otp = request.json['OTP']
        otp=int(u_otp)
        session['userotp']=otp
        print(session['userotp'])
        print(session)
        print(type(otp))
        return "otp send"   
@app.route('/verify_otp', methods=['POST'])
def verify_otp():
     print(session)
     v_otp = request.json['inte']
     print(v_otp)
     print(type(v_otp))
     print(session)
     use=session.get("userotp")
     print(use)
     print(type(use))
    
    
    #  print(use)
    #  print(type(use))

     if(v_otp==use):
         print("sucess")
         return 'opt matched'
     else:
         return 'OTP does not match'  

if __name__ == '__main__':
    app.run(debug=True)