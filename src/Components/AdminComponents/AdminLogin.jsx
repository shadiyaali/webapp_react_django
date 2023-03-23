import React from 'react'
import './AdminLogin.css'
import { useState ,useEffect} from "react";
import Cookies from 'js-cookie'
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import { AdminloginPost } from '../../utils/Constants';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { change } from "../../redux/userNameReducer";

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    const token=Cookies.get('admin_jwt')
    if(token){
      navigate('/users')
    }
  },[navigate])
  const handleadminLogin = (e) => {
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
      .post(AdminloginPost, data , {
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
          Cookies.set("admin_jwt",String(res.data.admin_jwt))
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          if (res.status===200){
            
        
            dispatch(change(res.data.payload.username));
            navigate("/users");
          }
        }
      
      })
    }
  
  };

  return (
    <form onSubmit={(e) => handleadminLogin(e)} class="login-form">

            <h1>Admin Login</h1>

            <div className="input-fields">
                <input type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} class="input-box" 
                    />
                <p>Admin Email </p>
            </div>

            <div className="input-fields">
                <input type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} class="input-box"
                    />
                <p>Password</p>
            </div>

            <input type="submit" value="Login" class="btn" />

        </form>
  )
}

export default AdminLogin
