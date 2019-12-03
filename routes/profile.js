const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

//@route    GET api/profile/me
//@desc     Get current user profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) {
      res.status(400).json({msg: "There's no profile for this user"});
    }
    res.json({profile});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/profile/
//@desc     Create or update a user profile
//@access   Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required")
      .not()
      .isEmpty(),
    check("skills", "Field is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({errors: errors.array()});
    }
    const {
      website,
      location,
      status,
      skills,
      bio,
      youtube,
      twitter,
      facebook,
      instagram,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true},
        );
        return res.json(profile);
      }

      //create profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

//@route    GET api/profile
//@desc     Get all users profiles
//@access   Public
router.get("/", async (req, res) => {
  console.log("eeeeej");
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
