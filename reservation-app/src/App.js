import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bookings from './components/Pages/bookings';
import Home from './components/Pages';
import Calendar from './components/Pages/calendar';
import Reporting from './components/Pages/reporting';
import Seating from './components/Pages/seating';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/bookings' component={Bookings} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/reporting' component={Reporting} />
        <Route path='/seating' component={Seating} />
        
      </Routes>
    </Router>
  );
}

export default App;
