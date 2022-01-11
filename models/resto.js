const mongoose = require("mongoose");

// Restorant schema
const restorantSchema = mongoose.Schema({
  resto_name: String,
  phone: String,
  address: String,
});

//Define and export
module.exports = mongoose.model("Restorant", restorantSchema);
