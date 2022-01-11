const mongoose = require("mongoose");

// Order schema
const orderSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // customer ID (reference to Customer)
  resto: { type: mongoose.Schema.Types.ObjectId, ref: "Restorant" }, // resto ID (reference to Restorant)
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }], // array of menu ID (reference to Menu)
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" }, // driver ID (reference to Driver)
  shipping_cost: Number,
  payment: { type: String, enum: ["cash", "gopay"] },
});

//Define and export
module.exports = mongoose.model("Order", orderSchema);
