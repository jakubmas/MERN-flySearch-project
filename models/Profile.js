const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  tickets: [
    {
      inbound: {
        type: String,
      },
      outbound: {
        type: String,
      },
      dateInbound: {
        type: String,
      },
      dateOutbound: {
        type: String,
      },
      price: {
        type: Number,
      },
      link: {
        type: [String],
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
