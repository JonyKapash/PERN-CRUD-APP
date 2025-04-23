import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config(); // load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json()); // parse json bodies in the request
app.use(cors()); // cors is a middleware that allows cross-origin requests
app.use(helmet()); // helmet is a security middleware that helps secure the app by setting various HTTP headers
app.use(morgan("dev")); // morgan is a logging middleware that logs the requests to the console

// routes
app.use("/api/products", productRoutes);

async function initializeDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
