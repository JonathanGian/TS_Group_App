// @ts-nocheck
import mariadb from "mariadb";
import dotenv from "dotenv";

// We can fully switch to .env later

dotenv.config(); // Load environment variables

//This is a MariaDB connection pool that allows us to connect to the database.
const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "dev_admin",
  password: process.env.DB_PASSWORD || "Creative1",
  database: process.env.DB_NAME || "user_auth",
  connectionLimit: 5, // Limits concurrent connections
});

export default pool;