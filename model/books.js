const mongoose = require("mongoose");

const booksSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    title: { type: String, require: true },

    author: { type: String, require: true },

    summary: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", booksSchema);
