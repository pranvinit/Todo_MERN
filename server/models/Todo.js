const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      trim: true,
      maxlength: [50, "name can not exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "please provide description"],
      maxlength: [500, "description can not exceed 20 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
