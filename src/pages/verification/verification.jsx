import axios from 'axios';
import React, { useState } from 'react'


import './verification.css'
const Verification = () => {
  const [votp, setVotp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setVotp([...votp.map((d, idx) => (idx === index ? element.value : d))]);
  


    console.log(`veried otp is  ${votp}`)
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const verify = async () => {
    try {
      const numberArray = [];
      votp.forEach( ele => numberArray.push(+ele))
        
      // Print the array of numbers
      console.log(numberArray)
      const inte = numberArray.reduce((accum, digit) => (accum * 10) + digit, 0);
      console.log(inte);
      const response = await axios.post('http://127.0.0.1:5000/verify_otp', {
        inte
      });
      const data = await response;
      if (data) {
        console.log("otp send for verification")
      } else {
        console.log('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.log('An error occurred. Please try again later.');
    }
  
  }

return (
  <>
    <div class="container1">
      <h2>Verify Your Account</h2>
      <p>
        We emailed you the six digit code to personal@email.com <br />
        Enter the code below to confirm your email address
      </p>

      <div class="code-container">
        {votp.map((data, index) => {
          return (
            <input
              className="otp-field code"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
          )
        })}

      </div>

      <div>
        <button type="submit" class="btn btn-primary" onClick={verify}>Verify</button>
      </div>

      <small class="info">
        If you didn't receive a code !! <strong> RESEND</strong>
      </small>

    </div>
  </>
)
}

export default Verification;