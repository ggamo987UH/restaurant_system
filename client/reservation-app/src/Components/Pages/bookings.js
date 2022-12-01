import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../../Styles/bookings.css";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import ModalOptions from "../login/modal/modal";
//import Register from "../login/registration";
function Bookings() {
  const [nameD, setName] = useState("");
  const [phoneD, setPhone] = useState("");
  const [emailD, setEmail] = useState("");
  const [partyD, setPartySize] = useState("");
  const [timeD, setPartyTime] = useState("");
  const [dateD, setPartyDate] = useState("");
  const [creditD, setCreditCard] = useState("");
  const [userType, setUserType] = useState("");
  const [isBookingClicked, setIsBookingClicked] = useState(false);

  const onClickBooking = () => {
    setIsBookingClicked(true);
    if (userType === "Guest") {
      insertBookings();
    }
  };

  const insertBookings = () => {
    var dayOfWeek = new Date(dateD).getDay();
    var datevar = dateD;
    var dateNoYear = datevar.slice(5, 10);

    if (creditD.length === 0 || creditD === null) {
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        alert("ERROR! Credit Card is required for weekend reservations.");
        return;
      }
      if (
        dateNoYear === "01-01" ||
        dateNoYear === "12-31" ||
        dateNoYear === "12-25" ||
        dateNoYear === "12-24" ||
        dateNoYear === "07-04" ||
        dateNoYear === "11-24" ||
        dateNoYear === "05-29"
      ) {
        alert("ERROR! Credit Card is required for holiday reservations.");
        return;
      }
    }

    Axios.post("http://localhost:3001/guests", {
      phone: phoneD,
    }).then((response) => {
      console.log(response);
    });

    Axios.post("http://localhost:3001/insertBookings", {
      name: nameD,
      phone: phoneD,
      email: emailD,
      credit: creditD,
      partySize: partyD,
      partyTime: timeD,
      partyDate: dateD,
    }).then((result) => {
      alert(result.data.message);
    });
  };

  useEffect(() => {
    console.log(isBookingClicked);
    console.log(userType);
    localStorage.setItem("name", nameD);
    localStorage.setItem("phone", phoneD);
    localStorage.setItem("email", emailD);
    localStorage.setItem("partySize", partyD);
    localStorage.setItem("partyTime", timeD);
    localStorage.setItem("partyDate", dateD);
    localStorage.setItem("creditCard", creditD);
  }, [isBookingClicked]);

  return (
    <div className="bookings">
      <div className="bookingsBackground">
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "tween", stiffness: 260, damping: 20 }}
        >
          <div className="container">
            <div class="title">Book Table</div>
            <div class="content">
              Disclaimer: There will be a $10 no-show fee if you do not show up
              for the reservations placed on holidays or weekends
            </div>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <div class="user__details">
                <div class="input__box">
                  <span class="details">Full Name</span>
                  <input
                    type="text"
                    className="formElement"
                    name="name"
                    placeholder="..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Party Size </span>
                  <input
                    type="number"
                    className="formElement"
                    name="partySize"
                    max="16"
                    min="1"
                    defaultValue="0"
                    onChange={(e) => setPartySize(e.target.value)}
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Email</span>
                  <input
                    type="text"
                    className="formElement"
                    name="email"
                    placeholder="..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Phone Number</span>
                  <input
                    type="text"
                    className="formElement"
                    name="phone"
                    placeholder="..."
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Party Date</span>
                  <input
                    type="date"
                    className="formElement"
                    name="partyDate"
                    onChange={(e) => setPartyDate(e.target.value)}
                    min="2022-11-23"
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Party Time</span>
                  <input
                    type="time"
                    className="formElement"
                    name="partyTime"
                    step="3600"
                    min="11:00"
                    max="22:00"
                    onChange={(e) => setPartyTime(e.target.value)}
                    required
                  />
                </div>
                <div class="input__box">
                  <span class="details">Credit Card Number:</span>
                  <input
                    type="text"
                    className="formElement"
                    name="creditCard"
                    placeholder="..."
                    maxLength={16}
                    onChange={(e) => setCreditCard(e.target.value)}
                  />
                </div>
              </div>
              <div
                class="gender__details"
                onChange={(e) => setUserType(e.target.value)}
              >
                <input type="radio" name="gender" id="dot-1" value="Guest" />
                <input type="radio" name="gender" id="dot-2" value="Member" />

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
              <button
                type="submit"
                className="buttonStyle"
                value="Submit"
                onClick={onClickBooking}
              >
                Submit Booking
              </button>
              {userType === "Member" && isBookingClicked === true && (
                <ModalOptions
                  show={true}
                  setIsBookingClicked={setIsBookingClicked}
                />
              ) }
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default Bookings;
