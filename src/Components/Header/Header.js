import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import Cookies from 'js-cookie';
import { change } from "../../redux/userNameReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { verifyToken } from "../../utils/Constants";

function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('jwt') 
    if (token) {
      axios.post(verifyToken, JSON.stringify({token}), {
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res.data.username,'usernameeeeee')
        dispatch(change(res.data.username))
      }).catch((err) => {
        console.log('error undada..')
      });
    }
  }, [dispatch]);

  const logout = () => {
    Cookies.remove('jwt')
    dispatch({ type: "logout" });
  };

  const username = useSelector((state) => state.username);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="loginPage">
          <span>
            {username ? (
              <span>
                <Link to="/userProfile">{username}</Link>{" "}
                <button onClick={logout}>Logout</button>
              </span>
            ) : (
              <button>
                <Link className="Link" to="/login">Login</Link>
              </button>
            )}
          </span>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Header;
