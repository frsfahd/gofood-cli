#!/usr/bin/env node

/* 
==========================================
BANNER
==========================================
*/
var logoCli = require("cli-logo"),
  version = "v" + require("./package.json").version,
  description = require("./package.json").description,
  logoConfig = {
    name: "GoFood-CLI",
    description: description,
    version: version,
    color: "green",
  };
logoCli.print(logoConfig);

// =======================================

const program = require("commander");
const { prompt } = require("inquirer");
prompt.registerPrompt("datetime", require("inquirer-datepicker-prompt"));
const {
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
} = require("./index");
const Restorant = require("./models/resto");
const Menu = require("./models/menu");
const Customer = require("./models/customer");
const Driver = require("./models/driver");

const { collection } = require("./models/customer");
program.version("1.0.0");

/* 
============================================
QUESTIONS -ft.inquirer-
============================================
*/

// Customer Questions
const questionsCustomer = [
  {
    type: "input",
    name: "name.firstname",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "name.lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
  {
    type: "input",
    name: "address",
    message: "Customer home Address",
  },
];

// Resto Questions
const questionsResto = [
  {
    type: "input",
    name: "resto_name",
    message: "Restorant Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Restorant Phone Number",
  },
  {
    type: "input",
    name: "address",
    message: "Restorant Address",
  },
];

// Menu Questions
const questionsMenu = [
  {
    type: "rawlist",
    name: "resto",
    message: "Restorant",
    choices: () =>
      Restorant.find().then((resto) => {
        var x = [];
        resto.forEach(function (item) {
          x.push({ value: item._id, name: item.resto_name });
        });
        return x;
      }),
  },
  {
    type: "input",
    name: "menu_name",
    message: "Menu Name",
  },
  {
    type: "input",
    name: "price",
    message: "Menu Price (Rp)",
  },
  {
    type: "list",
    name: "menu_type",
    message: "Type of Menu",
    choices: ["food", "beverage"],
  },
];

// Order Questions
let resto_id;
const questionsOrder = [
  // 01/01/2017 05:00 PM
  {
    type: "datetime",
    name: "date",
    message: "Date of Transaction",
    format: ["mm", "/", "dd", "/", "yyyy", " ", "hh", ":", "MM", " ", "TT"],
  },
  {
    type: "rawlist",
    name: "customer",
    message: "Customer",
    choices: () =>
      Customer.find().then((customer) => {
        var x = [];
        customer.forEach(function (item) {
          x.push({
            name: `${item.name.firstname} ${item.name.lastname}`,
            value: item._id,
          });
        });
        return x;
      }),
  },
  {
    type: "rawlist",
    name: "resto",
    message: "Restorant",
    choices: () =>
      Restorant.find().then((resto) => {
        var x = [];
        resto.forEach(function (item) {
          x.push({ value: item._id, name: item.resto_name });
        });

        return x;
      }),
    filter(answer) {
      resto_id = answer;
      console.info(resto_id);

      return answer;
    },
  },
  {
    type: "checkbox",
    name: "menu",
    message: "Menu",
    choices: () =>
      Menu.find({ resto: resto_id }).then((menu) => {
        var x = [];
        menu.forEach(function (item) {
          x.push({ value: item._id, name: item.menu_name });
        });
        return x;
      }),
  },
  {
    type: "rawlist",
    name: "driver",
    message: "Driver",
    choices: () =>
      Driver.find().then((driver) => {
        var x = [];
        driver.forEach(function (item) {
          x.push({
            name: `${item.name.firstname} ${item.name.lastname}`,
            value: item._id,
          });
        });
        return x;
      }),
  },
  {
    type: "number",
    name: "shipping_cost",
    message: "Shipping Cost (Rp)",
  },
  {
    type: "list",
    name: "payment",
    message: "Payment Method",
    choices: ["cash", "gopay"],
  },
];

// Driver Questions
const questionsDriver = [
  {
    type: "input",
    name: "name.firstname",
    message: "Driver First Name",
  },
  {
    type: "input",
    name: "name.lastname",
    message: "Driver Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Driver Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Driver Email Address",
  },
  {
    type: "input",
    name: "address",
    message: "Driver home Address",
  },
  {
    type: "input",
    name: "vehicle.license_number",
    message: "Vehicle License Number",
  },
  {
    type: "number",
    name: "vehicle.year",
    message: "Vehicle Year (yyyy)",
  },
  {
    type: "input",
    name: "vehicle.v_type",
    message: "Vehicle Type",
  },
];

/* 
============================================
Consolidated Commands
============================================
*/

// Find Command
program
  .command("find")
  .argument("<collection>", "name of collection")
  .argument("<name>")
  .alias("f")
  .description("find a document in certain collection")
  .action((collection, name) => {
    switch (collection) {
      case "customers":
        findCustomer(name);
        break;
      case "drivers":
        findDriver(name);
        break;
      case "restorants":
        findResto(name);
        break;
      case "menus":
        findMenu(name);
        break;
      // case "orders": // still error
      //   findOrder(name);
      //   break;
      default:
        console.info("syntax error");
        break;
    }
  });

// Add Comand
program
  .command("add")
  .argument("<collection>", "name of collection")
  .alias("a")
  .description("add a document to a certain collection")
  .action((collection) => {
    switch (collection) {
      case "customers":
        prompt(questionsCustomer).then((answers) => addCustomer(answers));
        break;
      case "drivers":
        prompt(questionsDriver).then((answers) => addDriver(answers));
        break;
      case "restorants":
        prompt(questionsResto).then((answers) => addResto(answers));
        break;
      case "menus":
        prompt(questionsMenu).then((answers) => addMenu(answers));
        break;
      case "orders":
        prompt(questionsOrder).then((answers) => addOrder(answers));
        break;
      default:
        console.info("syntax error");
        break;
    }
  });

// Update Command
program
  .command("update")
  .argument("<collection>", "name of collection")
  .argument("<_id>", "document ID")
  .alias("u")
  .description("update a document in a certain collection")
  .action((collection, _id) => {
    switch (collection) {
      case "customers":
        prompt(questionsCustomer).then((answers) =>
          updateCustomer(_id, answers)
        );
        break;
      case "drivers":
        prompt(questionsDriver).then((answers) => updateDriver(_id, answers));
        break;
      case "restorants":
        prompt(questionsResto).then((answers) => updateResto(_id, answers));
        break;
      case "menus":
        prompt(questionsMenu).then((answers) => updateMenu(_id, answers));
        break;
      case "orders":
        prompt(questionsOrder).then((answers) => updateOrder(_id, answers));
        break;
      default:
        console.info("syntax error");
        break;
    }
  });

// Remove Command
program
  .command("remove")
  .argument("<collection>", "name of collection")
  .argument("<_id>", "document ID")
  .alias("r")
  .description("remove a document in certain collection")
  .action((collection, _id) => {
    switch (collection) {
      case "customers":
        removeCustomer(_id);
        break;
      case "drivers":
        removeDriver(_id);
        break;
      case "restorants":
        removeResto(_id);
        break;
      case "menus":
        removeMenu(_id);
        break;
      case "orders":
        removeOrder(_id);
        break;
      default:
        console.info("syntax error");
        break;
    }
  });

// List Command
program
  .command("list")
  .argument("<collection>", "name of collection")
  .alias("l")
  .description("list all documents in certain collection")
  .action((collection) => {
    switch (collection) {
      case "customers":
        listCustomers();
        break;
      case "drivers":
        listDrivers();
        break;
      case "restorants":
        listResto();
        break;
      case "menus":
        listMenu();
        break;
      case "orders":
        listOrder();
        break;
      default:
        console.info("syntax error");
        break;
    }
  });

program.parse(process.argv);
