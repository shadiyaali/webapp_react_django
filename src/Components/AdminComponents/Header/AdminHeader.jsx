import React from 'react'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
// import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
function AdminHeader() {
  const navigate=useNavigate()
  // const dispatch = useDispatch();
  const logout=(e)=>{
    
    // dispatch({ type: "logout" });
    
    e.preventDefault();
    Swal.fire({
        title: 'Logout?',
        text: "Do you want to Logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
          Cookies.remove('admin_jwt')
          navigate('/adminlogin')
        }
    })
  };
  return (
    <nav class="navbar navbar-expand-lg adminHeadernav">
    <div class="container-fluid">
      <a class="navbar-brand" href="/adminHome" style={{color:"white"}} >WELCOME ADMIN</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
          
          </li>
          <li class="nav-item dropdown">
          
            <ul class="dropdown-menu">
            
            </ul>
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
        <form class="d-flex" >
        
          <button class="adminLogoutBtn" onClick={logout}  >Logout</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default AdminHeader
