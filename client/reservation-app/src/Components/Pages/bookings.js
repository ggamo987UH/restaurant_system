import React from "react";
//get style sheet
import "../../Styles/bookings.css";

function bookings() {
  return ( 
    <div className="divPadding">
      <form className="formStyle">
        <h1 className="formTitle">Bookings</h1>
        <label for="partySize">Party Size: </label>
        <input type="number" className="formElement" name="partySize" max="16" required/><br></br>
        <label for="partyTime">Party Time: </label>
        <input type="time" className="formElement" name="partyTime" required/><br></br>
        <label for="partyDate">Party Date: </label>
        <input type="date" className="formElement" name="partyDate" required/><br></br><br></br>
        <button type="submit" className="formElement">Submit</button>
      </form>
    </div>
  );
}
export default bookings;