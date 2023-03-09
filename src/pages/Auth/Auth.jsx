import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import "./auth.css";
import SignupImg from "../../img/SignupImg";
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_CLIENT_ID;

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId });
    });
    
  }, []);

  const onLoginSuccess = (res) => {
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
  };




  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
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
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
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
