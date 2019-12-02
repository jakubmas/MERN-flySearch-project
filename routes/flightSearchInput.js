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
      const resultBody = result.body.Places.filter(item => {
        return item.PlaceName !== item.CountryName;
      });
      res.json({resultBody});
    });
});

//@route    POST api/:originPlace/:destinationPlace/:outboundDate/:inboundDate
//@desc     Generates header token to get a list of results
//@access   Public

router.post(
  "/:originPlace/:destinationPlace/:outboundDate/:inboundDate",
  (req, res) => {
    const originPlace = req.params.originPlace;
    const destinationPlace = req.params.destinationPlace;
    const outboundDate = req.params.outboundDate;
    const inboundDate = req.params.inboundDate;
    console.log("eeeee", req.params);
    try {
      unirest
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
          console.log("post kurwa jegio mać, result.headers", result.headers);
          if (!result.headers.location) {
            res.json({msg: "error"});
          } else {
            console.log("result.headers", result.headers.location);
            const splitHeader = result.headers.location.split("/");
            console.log("splitHeader", splitHeader);
            const key = splitHeader[splitHeader.length - 1];
            console.log("key to tu? niemozliwe", key);
            res.json({key});
          }
        });
    } catch (error) {
      console.error(error.message);
      console.log("CO SIE DZIEJE", error);
    }
  },
);

//@route    GET api/:key
//@desc     Get data from API based on the key
//@access   Public
router.get("/key/:key", async (req, res) => {
  const key = req.params.key;
  console.log("key", key);
  try {
    await unirest
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}?sortOrder=asc`,
      )
      .header(
        "X-RapidAPI-Host",
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      )
      .header("X-RapidAPI-Key", config.get("X-RapidAPI-Key"))
      .end(function(result) {
        // console.log(result.body);
        const travelData = result.body;
        console.log("resbody?", travelData);
        console.log("JAAAAK?", travelData.Itineraries);
        if (travelData.ValidationErrors) {
          console.log("TODO: eeeerrrrroooooorrrr", travelData.ValidationError);
        } else {
          return res.json({travelData});
        }
      });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
