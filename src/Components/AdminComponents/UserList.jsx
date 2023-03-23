import React, { useState,useEffect } from 'react'
import Footer from './Footer/AdminFooter';
import AdminHeader from './Header/AdminHeader';
import axios from "../../utils/axios";
import { adminDeleteUser, AdminUserList } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import './users.css'
import Swal from 'sweetalert2'
function UserList() {
    const navigate=useNavigate()
    const [users,setusers]=useState([])
    useEffect((key)=>{
        getUsersList();

    }, [])
    const getUsersList=()=>{
        axios.get(AdminUserList).then((response)=>{
            setusers(response.data)
        }).catch((err)=>{
            console.log('Nope not again');
        })
    }
    const deleteUser=(id)=>{
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${adminDeleteUser}/${id}`).then((res)=>{
                    getUsersList();
                    
                })
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            }
          })
    }
return (
    <div >
        <AdminHeader/>
            <br/>
            
            <br/>
            <br />
                <button className=" addButtonAdmin" onClick={()=>navigate('/adminAddUser')} >add</button>
           <br />
           <br />
           <br />
           <br />
            <table id="customers">
                <tr>
                    <th className="w-5">No</th>
                    <th>User Name</th>
                    <th>Emaiil</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
               
                 
                {  users.map((user,index)=>
                   <tr>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className='editt' onClick={()=>navigate(`/updateUser/${user.id}`)} >Edit</button>
                    </td>
                    <td> 
                        <button className='deletee'onClick={()=>deleteUser(user.id)} >Delete</button>
                    </td>
                    </tr>
                  )}
                  

                

            </table>
           <Footer/>
        </div>
  )
}

export default UserList
