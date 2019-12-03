const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get("/", (req, res) => res.send("ELO MORDECZKO"));

// Define Routes
app.use("/api/flight", require("./routes/flightSearchInput"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

const PORT = 666;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
