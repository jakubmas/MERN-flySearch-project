const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const config = require("config");

//@route    GET api/:placeName
//@desc     Get country for input skyscanner api /
//@access   Public
router.get("/:placeName", async (req, res) => {
  const place = req.params.placeName;
  return await unirest
    .get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${place}`,
    )
    .header("X-RapidAPI-Host", config.get("X-RapidAPI-Host"))
    .header("X-RapidAPI-Key", config.get("X-RapidAPI-Key"))
    .end(function(result) {
      const resultBody = result.body.Places;
      res.json({ resultBody });
    });
});

module.exports = router;
