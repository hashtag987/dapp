// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const opsRoutes = require("./routes/operations");

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/ops", opsRoutes);

const port = 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
