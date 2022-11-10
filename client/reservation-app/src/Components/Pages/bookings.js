import React from "react";
// import Axios from "axios";
import "../../Styles/bookings.css";
import { motion } from "framer-motion";

function bookings() {

  // const addBooking = () => {
  //   Axios.post("http://localhost:3001/bookings", {
  //     name: "test",
  //     email: "test",
  //     phone: "test",
  //     date: "test",
  //     time: "test",
  //     people: "test",
  //     message: "test",
  //   });
  // };
  return ( 
    <div className="divPadding">
      <motion.div exit={{ opacity: 0 }} initial={{ scale:.85, opacity: 0 }} animate={{ scale:1, opacity: 1 }} transition={{ type:"tween",stiffness: 260, damping: 20}}>
      <form className="formStyle">
        <h1 className="formTitle">FIND TABLE</h1>
        <label for="name">Name</label><br></br>
        <input type="text" className="formElement" name="name" placeholder="..." required></input><br></br>
        <label for="phone">Phone</label><br></br>
        <input type="text" className="formElement" name="phone" placeholder="..." required></input><br></br>
        <label for="email">Email</label><br></br>
        <input type="text" className="formElement" name="email" placeholder="..." required></input><br></br>
        <label for="partySize">Party Size: </label>
        <input type="number" className="formElement" name="partySize" max="16" min="0" required/><br></br>
        <label for="partyTime">Party Time: </label>
        <input type="time" className="formElement" name="partyTime" step="1800" required/><br></br>
        <label for="partyDate">Party Date: </label>
        <input type="date" className="formElement" name="partyDate" required/><br></br>
        {/* <button type="submit" className="buttonStyle" value="Submit" onClick={searchBooking}>Search</button> */}
        <button type="submit" className="buttonStyle" value="Submit">Search</button>
      </form>
      </motion.div>
    </div>
  );
}
export default bookings;