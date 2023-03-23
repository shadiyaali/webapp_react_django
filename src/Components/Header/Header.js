import React, { useEffect } from 'react';
import { Link} from "react-router-dom";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import Cookies from 'js-cookie';
import { change } from "../../redux/userNameReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { verifyToken } from "../../utils/Constants";

function Header() {
 
  const dispatch = useDispatch();
useEffect(()=>{
  const token =Cookies.get('jwt') 
  if (token){
    axios.post(verifyToken,JSON.stringify({token}),{
      headers: { "Content-Type": "application/json" },
    }).then((res)=>{
      console.log(res.data.username,'usernameeeeee')
      dispatch(change(res.data.username))
      // console.log(res.data.status)
      
      
    }).catch((err) => {
      console.log('error undada..')
      // Cookies.remove('jwt')
    });

  }
},[dispatch]);
const username1 = useSelector((state) => {
  return state.username;
});
console.log(username1,'hihihhi')

const logout=()=>{
  Cookies.remove('jwt')
  dispatch({ type: "logout" });
};
const username = useSelector((state) => state.username);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span>
            {/* {username} */}
            {username ? (
              <span>
                {username}{" "}
                <button onClick={logout}>
              
                    Logout
                  
                </button>
              </span>
            ) : (
              <button>
                <Link className="Link" to="/login">
                  Login
                </Link>
              </button>
            )}
          </span>
          <hr />
        </div>
    

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
