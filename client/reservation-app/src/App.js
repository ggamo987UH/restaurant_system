import React from 'react';
import {
	BrowserRouter as Router,
	Route,
  Routes
  } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Bookings from "./Components/Pages/bookings";
import Calendar from "./Components/Pages/calendar";
import Register from "./Components/login/registration";


function App() {
	return (
		<Router>
       <Navbar />
      <Routes>
        <Route path="/"  element = {<Register/>}      />
        <Route path="bookings" element={<Bookings />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </Router>
	);
}
export default App;