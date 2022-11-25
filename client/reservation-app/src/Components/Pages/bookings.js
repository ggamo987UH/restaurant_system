import React, { useState } from "react";
import Axios from "axios";
import "../../Styles/bookings.css";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import ModalOptions from "../login/modal/modal";
//import Register from "../login/registration";
function Bookings() {

  const [nameD, setName] = useState('')
  const [phoneD, setPhone] = useState('')
  const [emailD, setEmail] = useState('')
  const [partyD, setPartySize] = useState('')
  const [timeD, setPartyTime] = useState('')
  const [dateD, setPartyDate] = useState('')

  const insertBookings = () => {
    Axios.post("http://localhost:3001/guests", {
      phone: phoneD,
    }).then((response) => {
      console.log(response);
    });


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
  <div className="bookings">
  <div className="bookingsBackground">
  <motion.div exit={{ opacity: 0 }} initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "tween", stiffness: 260, damping: 20 }}>
    <div className="container">
      <div class="title">Find Table</div>
        <form action="#">
          <div class="user__details">
            <div class="input__box">
              <span class="details">Full Name</span>
              <input type="text" className="formElement" name="name" placeholder="..." onChange={(e) => setName(e.target.value)} required />
            </div>
            <div class="input__box">
              <span class="details">Party Size </span>
              <input type="number" className="formElement" name="partySize" max="8" min="1" defaultValue="0" onChange={(e) => setPartySize(e.target.value)} required />
            </div>
            <div class="input__box">
              <span class="details">Email</span>
              <input type="text" className="formElement" name="email" placeholder="..." onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div class="input__box">
              <span class="details">Phone Number</span>
              <input type="text" className="formElement" name="phone" placeholder="..." onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div class="input__box">
              <span class="details">Party Date</span>
              <input type="date" className="formElement" name="partyDate" onChange={(e) => setPartyDate(e.target.value)} min="2022-11-23" required />
            </div>
            <div class="input__box">
              <span class="details">Party Time</span>
              <input type="time" className="formElement" name="partyTime" step="3600" min="11:00" max="22:00" onChange={(e) => setPartyTime(e.target.value)} required />
            </div>

          </div>
          <div class="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
           
            <span class="gender__title">Continue as: </span>
            <div class="category">
              <label for="dot-1">
                <span class="dot one"></span>
                <span>Guest</span>
              </label>
              <label for="dot-2">
                <span class="dot two"></span>
                <span>Member</span>
              </label>
            </div>
          </div>
          <button type="submit" className="buttonStyle" value="Submit" onClick={insertBookings}>Submit Booking</button>

          <ModalOptions />
        </form>
    </div>
  </motion.div>
  </div>
  </div>
  );
}
export default Bookings;