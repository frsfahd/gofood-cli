const mongoose = require("mongoose");
const Restorant = require("./resto");

// Menu schema
const menuSchema = mongoose.Schema({
  resto: { type: mongoose.Schema.Types.ObjectId, ref: "Restorant" },
  menu_name: String,
  price: Number,
  menu_type: { type: String, enum: ["food", "beverage"] }, // [food | beverage]
});

//Define and export
module.exports = mongoose.model("Menu", menuSchema);
