import React, { useEffect } from 'react';
import { change } from "../../redux/userNameReducer";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPost } from "../../utils/Constants";
import { useState } from "react";
import Cookies from 'js-cookie'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


useEffect(()=>{
  const token=Cookies.get('jwt')
  if(token){
    navigate('/')
  }
},[navigate])



  const handleLogin = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password,
    });
    if (email=== ''||password===''){
      Swal.fire(
        'Please Fill the components..',
        
    )
    }else{
      axios
      .post(loginPost, data , {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.status==='Wrong Password'|| res.data.status==='Email is not found'){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email or Password is incorrect",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Cookies.set("jwt",String(res.data.user_jwt))
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          if (res.status===200){
            
        
            dispatch(change(res.data.payload.username));
            navigate("/");
          }
        }
      
      })
    }
  
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='img'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        <br/>
        <span>
                      Don't have an account? <Link to="/signup">Register</Link>{" "}
                    </span>
        </form>
        {/* <a href='/'>Signup</a> */}
      </div>
    </div>
  );
}

export default Login;
