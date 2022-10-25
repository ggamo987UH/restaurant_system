import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES IMPORT
import flightRoute from "./routes/flights.route";
import boardingPassesRoute from "./routes/boarding-pass.route";
import aircraftRoute from "./routes/aircraft.route";
import airportRoute from "./routes/airport.route";
import gateRoute from "./routes/gate.route";

// CONFIGURE DOTENV
dotenv.config();

const app = express();

process.once("SIGUSR2", () =>
  server.close((err) => process.kill(process.pid, "SIGUSR2"))
);

// MIDDLEWARE
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

// ROUTES
app.use(`${process.env.API_BASE_URL}/flights`, flightRoute);
app.use(`${process.env.API_BASE_URL}/boarding-passes`, boardingPassesRoute);
app.use(`${process.env.API_BASE_URL}/aircrafts`, aircraftRoute);
app.use(`${process.env.API_BASE_URL}/airports`, airportRoute);
app.use(`${process.env.API_BASE_URL}/gates`, gateRoute);

app.listen(process.env.API_PORT, process.env.LISTEN_IP, () => {
  console.log(`${process.env.API_BASE_URL}/flights`);
  console.log(process.env.LISTEN_IP, process.env.API_BASE_URL);
  console.log(`We are live on ${process.env.API_PORT}`);
});

export default app;
