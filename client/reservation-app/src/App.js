import React from 'react';
import {
	BrowserRouter as Router,
	Route,
  Routes,

  } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import bookings from "./Components/Pages/bookings";

function App() {
	return (
		<Router>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/bookings" element={bookings} />
      </Routes>
    </Router>
	);
}

export default App;