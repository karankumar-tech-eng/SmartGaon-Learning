const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    studentClass: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "English",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);