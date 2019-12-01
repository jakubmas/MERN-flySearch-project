const express = require("express");

const app = express();

const PORT = 666;

app.use("/api", require("./routes/flightSearchInput"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
