import { Pool } from "pg";
import dotenv from "dotenv";

// CONFIGURE DOTENV
dotenv.config();

const config = {
  user: process.env.DB_USER, //this is the db user credential
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: process.env.DB_MAX, // max number of clients in the pool
  idleTimeoutMillis: process.env.DB_ITM,
};

const pool = new Pool(config);

export default pool;
