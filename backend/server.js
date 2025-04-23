import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json()); // parse json bodies in the request
app.use(cors()); // cors is a middleware that allows cross-origin requests
app.use(helmet()); // helmet is a security middleware that helps secure the app by setting various HTTP headers
app.use(morgan("dev")); // morgan is a logging middleware that logs the requests to the console

app.get("/", (req, res) => {
  res.send("Hello World - backend");
});

app.get("/test", (req, res) => {
  res.send("hello from test");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
