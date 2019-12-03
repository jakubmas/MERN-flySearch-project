const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

// Define Routes
app.use("/api", require("./routes/flightSearchInput"));
app.use("/api/users", require("./routes/users"));

const PORT = 666;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
