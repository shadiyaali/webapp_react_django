import React, { useState } from 'react';
import { signUpPost } from "../../utils/Constants";
import Logo from '../../olx-logo.png';
import './Signup.css';
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const [username,setUsername] =useState('');
  const [email,setEmail] =useState('');
  const [phone,setPhone] =useState('');
  const [password,setPassword] =useState('');
  const navigate = useNavigate();

  
  const handleSubmit=(e)=>{
   
    e.preventDefault()
    const body=JSON.stringify({
      username,
      email,
      password,
      phone
    });
    console.log(body)
    axios.post(signUpPost,body,{
      headers:{"Content-Type": "application/json"},
    }).then((response)=>{
      console.log(response.status)
      console.log('haiii hereeee')
      if (response.status === 200) {
        navigate("/login");
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: response.data.error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: err.data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='img'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
           
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* <a href='/login'>Login</a> */}
      </div>
    </div>
  );
}
