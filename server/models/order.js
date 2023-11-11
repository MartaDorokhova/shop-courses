const { Schema, model } = require("mongoose");

const ordersSchema = new Schema({
  courses: [
    {
      course: {
        type: Object,
        require: true,
      },
      count: {
        type: Number,
        require: true,
      },
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Orders", ordersSchema);
