import React from "react";
// import Axios from "axios";
import "../../Styles/bookings.css";

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
      <form className="formStyle">
        <h1 className="formTitle">BOOKINGS</h1>
        <label for="partySize">Party Size: </label>
        <input type="number" className="formElement" name="partySize" max="16" required/><br></br>
        <label for="partyTime">Party Time: </label>
        <input type="time" className="formElement" name="partyTime" required/><br></br>
        <label for="partyDate">Party Date: </label>
        <input type="date" className="formElement" name="partyDate" required/><br></br>
        {/* <button type="submit" className="formElement" value="Submit" onClick={addBooking}>Submit</button> */}
        <button type="submit" className="buttonStyle" value="Submit">Submit</button>
      </form>
    </div>
  );
}
export default bookings;