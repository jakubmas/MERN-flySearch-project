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
      res.json({resultBody});
    });
});

//@route    POST api/:originPlace/:destinationPlace/:outboundDate/:inboundDate
//@desc     Generates header token to get a list of results
//@access   Public

router.post(
  "/:originPlace/:destinationPlace/:outboundDate/:inboundDate",
  async (req, res) => {
    const originPlace = req.params.originPlace;
    const destinationPlace = req.params.destinationPlace;
    const outboundDate = req.params.outboundDate;
    const inboundDate = req.params.inboundDate;
    console.log("eeeee", req.params);
    try {
      await unirest
        .post(
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
        )
        .header(
          "X-RapidAPI-Host",
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        )
        .header("X-RapidAPI-Key", config.get("X-RapidAPI-Key"))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .send(`inboundDate=${inboundDate}`)
        .send("cabinClass=economy")
        .send("children=0")
        .send("infants=0")
        .send("country=US")
        .send("currency=PLN")
        .send("locale=en-US")
        .send(`originPlace=${originPlace}`)
        .send(`destinationPlace=${destinationPlace}`)
        .send(`outboundDate=${outboundDate}`)
        .send("adults=1")
        .end(function(result) {
          const splitHeader = result.headers.location.split("/");
          const key = splitHeader[splitHeader.length - 1];
          res.json({key});
        });
    } catch (error) {
      console.error(error.message);
    }
  },
);

//@route    GET api/:key
//@desc     Get data from API based on the key
//@access   Public
router.get("/key/:key", async (req, res) => {
  const key = req.params.key;
  console.log("key", key);
  unirest
    .get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}?pageIndex=0&pageSize=10`,
    )
    .header(
      "X-RapidAPI-Host",
      "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    )
    .header("X-RapidAPI-Key", config.get("X-RapidAPI-Key"))
    .end(function(result) {
      console.log(result.body);
      const travelData = result.body;
      res.json({travelData});
    });
});

module.exports = router;
