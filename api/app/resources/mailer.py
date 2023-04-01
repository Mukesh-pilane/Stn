from flask import Flask, request
import requests
import random
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)
def generate_otp():
   return str(random.randint(100000, 999999))
@app.route('/send_otp', methods=['POST'])
def send_otp():
    email = request.json['email']
    otp = generate_otp()

    data = {
        'service_id': 'service_pdfpdck', # Replace with your EmailJS service ID
        'template_id': 'template_rr2yokj', # Replace with your EmailJS template ID
        'user_id': 'uCXIHYiFOETO725vX', # Replace with your EmailJS user ID
        'template_params': {
            'to_email': email,
            'otp': otp
        }
    }

    try:
        response = requests.post('https://api.emailjs.com/api/v1.0/email/send', json=data)
        response.raise_for_status()
        return {'success': True, 'message': f'OTP sent to {email}'}
    except Exception as e:
        print(e)
        return {'success': False, 'message': 'Failed to send OTP'}
    

if name=="main":
    app.run(debug=True)