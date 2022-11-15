import React, { useState } from "react";
import Axios from "axios";
import "../../Styles/bookings.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ModalOptions from "../login/modal/modal";
//import Register from "../login/registration";
function Bookings()  {

  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [party, setPartySize] = useState("")
  const [time, setPartyTime] = useState("")
  const [date, setPartyDate] = useState("")

  const searchBookings = () => {
    Axios.post('http://localhost:3001/searchBookings', {
      name: name,
      phone: phone,
      email: email,
      party: party,
      time: time,
      date: date
    }).then((response) => {
        console.log(response);
    });
  };

  return ( 
    <div className="divPadding">

      <motion.div exit={{ opacity: 0 }} initial={{ scale:.85, opacity: 0 }} animate={{ scale:1, opacity: 1 }} transition={{ type:"tween",stiffness: 260, damping: 20}}>
      <form className="formStyle">
        <h1 className="formTitle">FIND TABLE</h1>
        <label for="name">Name</label><br></br>
        <input type="text" className="formElement" name="name" placeholder="..." onChange={(e) => setName(e.target.value)} required></input><br></br>
        <label for="phone">Phone</label><br></br>
        <input type="text" className="formElement" name="phone" placeholder="..." onChange={(e) => setPhone(e.target.value)} required></input><br></br>
        <label for="email">Email</label><br></br>
        <input type="text" className="formElement" name="email" placeholder="..." onChange={(e) => setEmail(e.target.value)} required></input><br></br>
        <label for="partySize">Party Size: </label>
        <input type="number" className="formElement" name="partySize" max="16" min="0" onChange={(e) => setPartySize(e.target.value)} required/><br></br>
        <label for="partyTime">Party Time: </label>
        <input type="time" className="formElement" name="partyTime" step="1800" onChange={(e) => setPartyTime(e.target.value)} required/><br></br>
        <label for="partyDate">Party Date: </label>
        <input type="date" className="formElement" name="partyDate" onChange={(e) => setPartyDate(e.target.value)} required/><br></br>
        {/* <button type="submit" className="buttonStyle" value="Submit" onClick={searchBooking}>Search</button> */}
        <button type="submit" className="buttonStyle" value="Submit">Search</button>
        <h2 className="formTitle">
          <ModalOptions />
        </h2>

      </form>
      </motion.div>
    </div>
  );
}
export default Bookings;