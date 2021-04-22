const inquirer = require("inquirer");
require("console.table");

// put all functions for cli here!
class CLI {
  constructor(db) {
    this.db = db;
  }

  start() {
    this.db.init().then(() => this.main_menu());
  }

  exit() {
    return this.db.close_connection(() => process.exit(0));
  }

  main_menu() {
    const VIEWALLEmps = "View All Employees";
    const VIEWALLDepts = "View All Departments";
    const VIEWEmpsBYMgr = "View Employees by Manager";
    const VIEWEmpsBYDept = "View Employees by Department";
    const choices = [VIEWALLEmps, VIEWALLDepts, VIEWEmpsBYMgr, VIEWEmpsBYDept];
    return inquirer
      .prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices,
      })
      .then((answer) => {
        switch (answer.choice) {
          case VIEWALLEmps:
            return this.view_emps();

          case VIEWALLDepts:
            return this.view_depts();
            
          default:
            console.log("Thanks for using this software, Goodbye!");
            return this.exit();
        }
      });
  }

  view_emps() {
    return this.db
      .viewAll_emps()
      .then((allEmps) => {
        console.table(allEmps);
      })
      .then(() => {
        return this.main_menu();
      });
  }
}

module.exports = CLI;
