const mongoose = require("mongoose");
var Table = require("easy-table");

// map global promise - get rid of warning
mongoose.Promise = global.Promise;
//connect to db
const db = mongoose.connect("mongodb://localhost:27017/gofoodcli");

// Import model
const Customer = require("./models/customer");
const Restorant = require("./models/resto");
const Menu = require("./models/menu");
const Order = require("./models/order");
const Driver = require("./models/driver");

/* 
============================================
Customer Operations
============================================
*/

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    // db.close();
    mongoose.connection.close();
  });
};

// Find Customer
const findCustomer = (name) => {
  // Make case insencitive
  const search = new RegExp(name, "i");
  Customer.find({
    $or: [{ "name.firstname": search }, { "name.lastname": search }],
  }).then((customer) => {
    // Table
    var t = new Table();

    customer.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("name", `${item.name.firstname} ${item.name.lastname}`);
      t.cell("email", item.email);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.newRow();
    });
    console.log(t.toString());
    console.info(`${customer.length} matches`);
    //   db.close();
    mongoose.connection.close();
  });
};

// Update Customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer).then((customer) => {
    console.info("Customer Updated");
    mongoose.connection.close();
  });
};

// Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    console.info("Customer Removed");
    mongoose.connection.close();
  });
};

//  List Customers
const listCustomers = () => {
  Customer.find().then((customers) => {
    // console.info(customers);

    // Table
    var t = new Table();

    customers.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("name", `${item.name.firstname} ${item.name.lastname}`);
      t.cell("email", item.email);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.newRow();
    });
    console.log(t.toString());

    console.info(`${customers.length} customers`);
    mongoose.connection.close();
  });
};

/* 
============================================
Restorant Operations
============================================
*/

// Add Resto
const addResto = (resto) => {
  Restorant.create(resto).then((resto) => {
    console.info("New Resto Added");
    // db.close();
    mongoose.connection.close();
  });
};

// Find Resto
const findResto = (name) => {
  // Make case insencitive
  const search = new RegExp(name, "i");
  Restorant.find({ resto_name: search }).then((resto) => {
    // Table
    var t = new Table();

    resto.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("resto_name", item.resto_name);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.newRow();
    });
    console.log(t.toString());
    console.info(`${resto.length} matches`);
    //   db.close();
    mongoose.connection.close();
  });
};

// Update Resto
const updateResto = (_id, resto) => {
  Restorant.updateOne({ _id }, resto).then((Resto) => {
    console.info("Restorant Updated");
    mongoose.connection.close();
  });
};

// Remove Resto
const removeResto = (_id) => {
  Restorant.deleteOne({ _id }).then((resto) => {
    console.info("Restorant Removed");
    mongoose.connection.close();
  });
};

//  List Resto
const listResto = () => {
  Restorant.find().then((resto) => {
    // console.info(resto);

    // Table
    var t = new Table();

    resto.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("resto_name", item.resto_name);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.newRow();
    });
    console.log(t.toString());

    console.info(`${resto.length} Restorants`);
    mongoose.connection.close();
  });
};

/* 
============================================
Menu Operations
============================================
*/

// Add Menu
const addMenu = (menu) => {
  Menu.create(menu).then((Menu) => {
    console.info("New Resto Added");
    // db.close();
    mongoose.connection.close();
  });
};

// Find Menu
const findMenu = (name) => {
  // Make case insencitive
  const search = new RegExp(name, "i");
  Menu.find({ menu_name: search })
    .populate("resto")
    .then((menu) => {
      // console.info(menu);

      // Table
      var t = new Table();

      menu.forEach(function (item) {
        t.cell("_id", item._id);
        t.cell("menu_name", item.menu_name);
        t.cell("price", item.price);
        t.cell("menu_type", item.menu_type);
        t.cell("resto_name", item.resto.resto_name);
        t.cell("resto_address", item.resto.address);
        t.newRow();
      });
      console.log(t.toString());

      console.info(`${menu.length} matches`);
      //   db.close();
      mongoose.connection.close();
    });
};

// Update Menu
const updateMenu = (_id, menu) => {
  Menu.updateOne({ _id }, menu).then((menu) => {
    console.info("Menu Updated");
    mongoose.connection.close();
  });
};

// Remove Menu
const removeMenu = (_id) => {
  Menu.deleteOne({ _id }).then((resto) => {
    console.info("Menu Removed");
    mongoose.connection.close();
  });
};

//  List Menu
const listMenu = () => {
  Menu.find()
    .populate("resto")
    .then((menu) => {
      // console.info(resto);

      // Table
      var t = new Table();

      menu.forEach(function (item) {
        t.cell("_id", item._id);
        t.cell("menu_name", item.menu_name);
        t.cell("price (Rp)", item.price);
        t.cell("menu_type", item.menu_type);
        t.cell("resto_name", item.resto.resto_name);
        t.cell("resto_address", item.resto.address);
        t.newRow();
      });
      console.log(t.toString());

      console.info(`${menu.length} Items`);
      mongoose.connection.close();
    });
};

/* 
============================================
Order Operations
============================================
*/

// Add Order
const addOrder = (order) => {
  Order.create(order).then((order) => {
    console.info("New Order Added");
    // db.close();
    mongoose.connection.close();
  });
};

// Find Order
const findOrder = (name) => {
  // Make case insencitive
  const search = new RegExp(name, "i");
  Order.find({
    $or: [
      // { date: search },
      { "customer.name.firstname": search },
      { "customer.name.lastname": search },
      { "customer.address": search },
      { "menu.menu_name": search },
      { "resto.resto_name": search },
      { "resto.address": search },
    ],
  })
    .populate("resto")
    .then((order) => {
      // console.info(menu);

      // Table
      var t = new Table();

      order.forEach(function (item) {
        t.cell("_id", item._id);
        t.cell("date", item.date);
        t.cell("menu", item.menu.menu_name);
        t.cell("customer_name", [
          item.customer.name.firstname,
          item.customer.name.firstname,
        ]);
        // t.cell("resto_id", item.resto._id);
        t.cell("resto_name", item.resto.resto_name);
        t.cell("resto_address", item.resto.address);
        t.newRow();
      });
      console.log(t.toString());

      console.info(`${order.length} matches`);
      //   db.close();
      mongoose.connection.close();
    });
};

// Update Order
const updateOrder = (_id, order) => {
  Order.updateOne({ _id }, order).then((order) => {
    console.info("Order Updated");
    mongoose.connection.close();
  });
};

// Remove Order
const removeOrder = (_id) => {
  Order.deleteOne({ _id }).then((order) => {
    console.info("Order Removed");
    mongoose.connection.close();
  });
};

//  List Order
const listOrder = () => {
  Order.find()
    .populate(["menu", "customer", "resto", "driver"])
    .then((order) => {
      // console.info(menu);

      // Table
      var t = new Table();

      order.forEach(function (item) {
        t.cell("_id", item._id);
        t.cell("date", item.date.toDateString());
        let list_menu = [];
        let total = 0;
        item.menu.forEach((x) => {
          list_menu.push(x.menu_name);
          total = total + x.price;
          return list_menu;
        });
        t.cell("menu", list_menu);
        t.cell(
          "customer_name",
          `${item.customer.name.firstname} ${item.customer.name.lastname}`
        );
        // t.cell("resto_id", item.resto._id);
        t.cell("resto_name", item.resto.resto_name);
        t.cell(
          "driver_name",
          `${item.driver.name.firstname} ${item.driver.name.lastname}`
        );
        t.cell("payment", item.payment);
        t.cell("shipping_cost (Rp)", item.shipping_cost, Table.number(0));
        t.cell("total cost (Rp)", total + item.shipping_cost, Table.number(0));
        t.newRow();
        t.total("shipping_cost (Rp)");
        t.total("total cost (Rp)");
      });
      console.log(t.toString());

      console.info(`${order.length} Orders`);
      mongoose.connection.close();
    });
};

/* 
============================================
Driver Operations
============================================
*/

// Add Driver
const addDriver = (driver) => {
  Driver.create(driver).then((driver) => {
    console.info("New Driver Added");
    // db.close();
    mongoose.connection.close();
  });
};

// Find Driver
const findDriver = (name) => {
  // Make case insencitive
  const search = new RegExp(name, "i");
  Customer.find({
    $or: [{ "name.firstname": search }, { "name.lastname": search }],
  }).then((driver) => {
    // Table
    var t = new Table();

    driver.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("name", `${item.name.firstname} ${item.name.lastname}`);
      t.cell("email", item.email);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.cell("vehicle license_number", item.vehicle.license_number);
      t.cell("vehicle year", item.vehicle.year);
      t.cell("vehicle type", item.vehicle.v_type);
      t.newRow();
    });
    console.log(t.toString());
    console.info(`${driver.length} matches`);
    //   db.close();
    mongoose.connection.close();
  });
};

// Update Driver
const updateDriver = (_id, driver) => {
  Driver.updateOne({ _id }, driver).then((driver) => {
    console.info("Driver Updated");
    mongoose.connection.close();
  });
};

// Remove Driver
const removeDriver = (_id) => {
  Driver.deleteOne({ _id }).then((driver) => {
    console.info("Driver Removed");
    mongoose.connection.close();
  });
};

//  List Drivers
const listDrivers = () => {
  Driver.find().then((drivers) => {
    // console.info(customers);

    // Table
    var t = new Table();

    drivers.forEach(function (item) {
      t.cell("_id", item._id);
      t.cell("name", `${item.name.firstname} ${item.name.lastname}`);
      t.cell("email", item.email);
      t.cell("phone", item.phone);
      t.cell("address", item.address);
      t.cell("vehicle license_number", item.vehicle.license_number);
      t.cell("vehicle year", item.vehicle.year);
      t.cell("vehicle type", item.vehicle.v_type);
      t.newRow();
    });
    console.log(t.toString());
    console.info(`${drivers.length} matches`);
    mongoose.connection.close();
  });
};

// Export All Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
  addResto,
  findResto,
  updateResto,
  removeResto,
  listResto,
  addMenu,
  findMenu,
  updateMenu,
  removeMenu,
  listMenu,
  addOrder,
  findOrder,
  updateOrder,
  removeOrder,
  listOrder,
  addDriver,
  findDriver,
  updateDriver,
  removeDriver,
  listDrivers,
};
