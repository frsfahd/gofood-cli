const mongoose = require("mongoose");

// Customer schema
const customerSchema = mongoose.Schema({
  name: {
    firstname: String,
    lastname: String,
  },
  email: String,
  phone: String,
  address: String,
});

//Define and export
module.exports = mongoose.model("Customer", customerSchema);
