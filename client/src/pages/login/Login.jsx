import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
// import {CircularProgress} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom"

export default function Login() {

  const email = useRef();
  const password = useRef();
  const {user, isFetching, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e)=>{
    e.preventDefault();
    console.log(email.current.value)
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }  ;

  const register = (e)=>{
    e.preventDefault();
    navigate("/register");
  }

  console.log(user)
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">MJSocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on MJSocial.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                    <input 
                        placeholder="Password" 
                        type="password" 
                        required
                        minLength={6}
                        className="loginInput" 
                        ref={password} 
                    />
                    <button className="loginButton" type="submit" disabled={isFetching}>
                      {isFetching 
                      ? (<CircularProgress color="inherit" size="20px"/>) 
                      : ("Log In"
                  )}
                    </button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton" onClick={register}>
                    {isFetching 
                    ? (<CircularProgress color="inherit" size="20px"/>) 
                    : ("Create a New Account"
                      )}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
