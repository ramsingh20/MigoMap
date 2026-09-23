const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(helmet());

app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173",}));

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MigoMap API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRoutes);

module.exports = app;