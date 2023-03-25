// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth");


// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);

const port = 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
