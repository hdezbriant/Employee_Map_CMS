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
    const VIEWALLDepts = "View All Available Departments";
    const VIEWALLRoles = "View All Currently Available Roles";
    const VIEWEmpsBYMgr = "View Employees by Manager";
    const ADDNEWData = "Add a new Employee, Department or Role";
    const UPDATEMgr = "Update an Employee's Manager";
    const UPDATERole = "Update an Employee's current role";
    const DELETEData = "Remove an Employee, Department, Role from the Database";
    const choices = [
      VIEWALLEmps,
      VIEWALLDepts,
      VIEWALLRoles,
      VIEWEmpsBYMgr,
      ADDNEWData,
      UPDATEMgr,
      UPDATERole,
      DELETEData,
    ];
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

          case VIEWALLRoles:
            return this.view_roles();

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

  view_depts() {
    return this.db
      .viewAll_depts()
      .then((allDepts) => {
        console.table(allDepts);
      })
      .then(() => {
        return this.main_menu();
      });
  }

  view_roles() {
    return this.db
      .viewAll_roles()
      .then((allRoles) => {
        console.table(allRoles);
      })
      .then(() => {
        return this.main_menu();
      });
  }
}

module.exports = CLI;
