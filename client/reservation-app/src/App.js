import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	// Switch,
  Routes,
	Link
  } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import bookings from "./Components/Pages/bookings";

function App() {
	return (
		<Router>
        <Routes>
          <Route path="/bookings">
            <bookings />
          </Route>
        </Routes>
    </Router>
	);
}

export default App;