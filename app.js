const express = require("express");

const app = express();

const PORT = 666;

app.use("/api/place", require("./routes/flightSearchInput"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
