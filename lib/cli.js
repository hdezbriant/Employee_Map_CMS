const inquirer = require("inquirer");
require("console.table");

// put all functions for cli here!
class CLI {
  constructor(db) {
    this.db = db;
  }

  start() {
    this.db.init()
    .then(() => this.main_menu());
  }

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }

}

module.exports = CLI;
