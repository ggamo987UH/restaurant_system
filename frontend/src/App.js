import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FlightsOverview from "./containers/FlightOverview/FlightsOverview";
import FlightDashboard from "./containers/FlightDashboard/FlightDashboard";

const App = () => {
  return (
    // <main>
    <Routes>
      <Route exact path="/" element={<FlightsOverview />} />
      <Route exact path="/flight-dashboard" element={<FlightDashboard />} />
    </Routes>
    // </main>
  );
};

export default App;
