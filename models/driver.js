const mongoose = require("mongoose");

// Driver schema
const driverSchema = mongoose.Schema({
  name: {
    firstname: String,
    lastname: String,
  },
  email: String,
  phone: String,
  address: String,
  vehicle: {
    license_number: String,
    year: Number,
    v_type: String,
  },
});

//Define and export
module.exports = mongoose.model("Driver", driverSchema);
