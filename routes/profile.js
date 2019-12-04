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
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get user profile by user id
//@access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "email"]);
    if (!profile) {
      res.status(400).json({msg: "Profile not found"});
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(400).json({msg: "Profile not found"});
    }
    res.status(500).json({msg: "Server Error"});
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, user
//@access   Private
router.delete("/", auth, async (req, res) => {
  try {
    //Delete profile
    await Profile.findOneAndRemove({user: req.user.id});
    //Remove user
    await User.findOneAndRemove({_id: req.user.id});
    res.json({msg: "User deleted"});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: "Server Error"});
  }
});

//@route    PUT api/profile/tickets
//@desc     Add tickets
//@access   Private
router.put("/tickets", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {
    inbound,
    outbound,
    dateInbound,
    dateOutbound,
    current,
    description,
    price,
    link,
  } = req.body;

  const newTicket = {
    inbound,
    outbound,
    dateInbound,
    dateOutbound,
    current,
    description,
    price,
    link,
  };
  try {
    const profile = await Profile.findOne({user: req.user.id});
    profile.tickets.unshift(newTicket);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/profile/tickets/:ticket_id
//@desc     Delete ticket from profile
//@access   private
router.delete("/tickets/:ticket_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    //Get remove index
    const removeIndex = profile.tickets
      .map(ticket => ticket.id)
      .indexOf(req.params.ticket_id);
    profile.tickets.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
