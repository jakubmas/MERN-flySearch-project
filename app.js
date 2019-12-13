const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

// Define Routes
app.use("/api/flight", require("./routes/flightSearch"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/ticket", require("./routes/ticket"));
const PORT = 123;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
