import logo from "../images/foodlogo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  
  //suscribing to store using selector
  const cartItems=useSelector((store)=> store.cart.items);

  return (
    <div className="flex justify-between bg-[#CCCCCC] shadow-lg m-2 rounded-md">
      <div className="logo-container rounded-md">
        <img className="w-40 m-2 p-2 rounded-md" src={logo} alt="Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-3">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="px-3">
            <Link to="/about">About us</Link>
          </li>
          <li className="px-3 ">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-3 font-bold cursor-pointer ">
          <Link to="/cart">Cart-({cartItems.length})</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
