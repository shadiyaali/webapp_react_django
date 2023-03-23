import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './Components/Signup/Signup';
import Home from './Pages/Home';
import Login from './Components/Login/Login'
import AdminPage from './Pages/AdminPage'
import UserList from './Components/AdminComponents/UserList';
import AdminaddUser from './Components/AdminComponents/AdminaddUser';
import UpdateUser from './Components/AdminComponents/UpdateUser';
function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/adminlogin' element={<AdminPage/>} />
          <Route path='/users' element={<UserList/>} />
          <Route path='/adminAddUser' element={<AdminaddUser/>}/>
          <Route path='/updateUser/:id' element={<UpdateUser/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
