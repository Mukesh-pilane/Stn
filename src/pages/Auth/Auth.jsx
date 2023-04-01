import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect, useRef,useState } from "react";
import "./auth.css";
import SignupImg from "../../img/SignupImg";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { verify } from "../../features/userSlice";
import { refreshTokenSetup } from "../../utils/refreshTokenSetup";
import axios from "axios";

const sendOTP = async (email) => {
  try {
    const response=await axios.post('http://127.0.0.1:5000/send_otp', { email });

    // const response = await fetch('http://127.0.0.1:5000/send_otp', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // });
    const data = response;
    console.log(data);
    console.log(data.data.message);
  } catch (error) {
    console.error(error);
  }
};

const Auth = () => {

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // perform validation
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    setErrors(errors);
    // if no errors, send the OTP
    if (Object.keys(errors).length === 0) {
      const OTP = generateOTP();
      setOtp(OTP);
      const templateParams = {
      
        to_email: email,
        message_html: `Your OTP is ${OTP}`
      };
      const response = await emailjs.send('service_pdfpdck', 'template_n6cb209', templateParams, 'ibIYDfJeSdCAW-V8C');
      if (response.status === 200) {
        setOtpSent(true);
        console.log(response)
        try {
          const response = await axios.post('http://127.0.0.1:5000/send_otp', {
            OTP
          });
          const data = await response;
          if (data) {
            navigate("/verifylog")
          } else {
            console.log('OTP verification failed. Please try again.');
          }
        } catch (error) {
          console.log('An error occurred. Please try again later.');
        }
      };
        
      }
    }
 
  

  const generateOTP = () => {
    // generate a 6-digit OTP
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const dispatch = useDispatch();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId });
    });
    
  }, []);
  const form = useRef();
  const onLoginSuccess = (res) => {
    refreshTokenSetup(res)
    localStorage.setItem('tokenId', res.tokenId.trim(' '))
    navigate('/')
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res.data.uinfo);
  };


  
  const handlesignup = () => {
    let cont = document.querySelector(".container");
    cont.classList.add("sign-up-mode");
  };
  const handlesignin = () => {
    let cont = document.querySelector(".container");
    cont.classList.remove("sign-up-mode");
    navigate("/verifylog")
   
  };

  // useEffect(()=>{
  //   sendOTP('wwwkamleshyadav732@gmail.com')
  // },[])
  // const sendEmail = (e) => {
  //   e.preventDefault();
   
  //   emailjs
  //     .sendForm(
  //       "service_pdfpdck",
  //       "template_rr2yokj",
  //       form.current,
  //       "ibIYDfJeSdCAW-V8C"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };



 

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="/" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" onClick={()=>{navigate("/verifylog")}} className="btn solid" />
              <div className="or">
                <hr style={{ borderColor: "#A6B1E1", width: "50px" }} />
                <p className="text-center text-sm">OR</p>
                <hr style={{ borderColor: "#A6B1E1", width: "50px" }} />
              </div>
              <div className="social-media">
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Sign In with Google"
                      onSuccess={onLoginSuccess}
                      onFailure={onLoginFailure}
                      cookiePolicy='http://localhost:3000/'
                      isSignedIn={true}
                    />
              </div>
            </form>
            <form  ref={form} className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign up</h2>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="user_name"  placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            {errors.email && <span>{errors.email}</span>} 
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <div className="or">
                <hr style={{ borderColor: "#A6B1E1", width: "50px" }} />
                <p className="text-center text-sm">OR</p>
                <hr style={{ borderColor: "#A6B1E1", width: "50px" }} />
              </div>

              <div className="social-media">
                <div style={{ marginBottom: "10px" }}>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Sign Up with Google"
                      onSuccess={onLoginSuccess}
                      onFailure={onLoginFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                    />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handlesignup}
              >
                Sign up
              </button>
            </div>
            <div className="image">
              <SignupImg className="image" />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handlesignin}
              >
                Sign in
              </button>
            </div>
            <div className="image">
              <SignupImg className="image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
