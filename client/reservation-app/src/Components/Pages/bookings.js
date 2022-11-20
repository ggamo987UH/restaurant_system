import React, { useState } from "react";
import Axios from "axios";
import "../../Styles/bookings.css";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import ModalOptions from "../login/modal/modal";
//import Register from "../login/registration";
function Bookings()  {

  const [nameD, setName] = useState('')
  const [phoneD, setPhone] = useState('')
  const [emailD, setEmail] = useState('')
  const [partyD, setPartySize] = useState('')
  const [timeD, setPartyTime] = useState('')
  const [dateD, setPartyDate] = useState('')

  const insertBookings = () => {
    Axios.post('http://localhost:3001/insertBookings', {
      name: nameD,
      phone: phoneD,
      email: emailD,
      partySize: partyD,
      partyTime: timeD,
      partyDate: dateD
    }).then((result) => {
      alert(result.data.message);
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
        <input type="number" className="formElement" name="partySize" max="8" min="0" defaultValue="1" onChange={(e) => setPartySize(e.target.value)} required/><br></br>
        <label for="partyDate">Party Date: </label>
        {/* <input type="date" className="formElement" name="partyDate" onChange={(e) => setPartyDate(e.target.value)} required/><br></br> */}
        <input type="date" className="formElement" name="partyDate" onChange={(e) => setPartyDate(e.target.value)} min="2022-11-19" required/><br></br>
        <label for="partyTime">Party Time: </label>
        <input type="time" className="formElement" name="partyTime" step="3600" onChange={(e) => setPartyTime(e.target.value)} required/><br></br>
        <button type="submit" className="buttonStyle" value="Submit" onClick={insertBookings}>Submit Booking</button>
        <h2 className="formTitle">
          <ModalOptions />
        </h2>
      </form>
      </motion.div>
    </div>
  );
}
export default Bookings;