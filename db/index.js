const util = require('util');
const defaultConnection = require('./connection');

// ==========================================
// Creates class constructor to handle DB manipulation
// ==========================================
class DB {
  constructor(connection = defaultConnection) {
    this.connection = connection;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          return reject(error);
        }
        this.connection.query = util.promisify(this.connection.query);
        resolve();
      });
    });
  }

  close_connection(callback) {
    return this.connection.end(callback);
  }

  viewAll_emps() {
    const query_string =
    `SELECT concat(emp.first_name,' ',emp.last_name) as 'Employee',
    role.title AS 'Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    concat(mgr.first_name,' ',mgr.last_name) as 'Manager'
    FROM employee AS emp
    LEFT JOIN role
    ON emp.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee AS mgr
    ON emp.manager_id = mgr.id
    ORDER BY Department;
    `;
    return this.connection.query(query_string);
  }

  // search category and item_name column for any matching text to the
  // given search_term string.
  search_auctions(search_term) {
    const value = `%${search_term}%`;
    const query_string =
      'SELECT auctions.id AS id, item_name, category, starting_bid, highest_bid, seller_id, highest_bidder_id, users.username AS highest_bidder FROM auctions LEFT JOIN users ON auctions.highest_bidder_id = users.id WHERE item_name LIKE ? OR category LIKE ?';
    return this.connection.query(query_string, [value, value]);
  }

  find_auctions(criteria) {
    const query_string =
      'SELECT auctions.id AS id, item_name, category, starting_bid, highest_bid, seller_id, highest_bidder_id, users.username AS highest_bidder FROM auctions LEFT JOIN users ON auctions.highest_bidder_id = users.id WHERE ? ';
    return this.connection.query(query_string, criteria);
  }

  create_auction(new_auction) {
    const query_string = 'INSERT INTO auctions SET ?';
    return this.connection.query(query_string, new_auction);
  }

  update_auction(id, values) {
    console.log(id);
    const query_string = 'UPDATE auctions SET ? WHERE id = ?';
    return this.connection.query(query_string, [values, id]);
  }

  set_highest_bid(item_id, highest_bid, highest_bidder_id) {
    return this.update_auction(item_id, { highest_bid, highest_bidder_id });
  }

  find_user_by_username(username) {
    const query_string = 'SELECT * FROM users WHERE username = ?';
    return this.connection
      .query(query_string, username)
      .then((rows) => rows[0]);
  }

  create_new_user(username, password) {
    const query_string = 'INSERT INTO users SET ?';
    return connection
      .query(query_string, { username, password })
      .then(() => true)
      .catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
          return false;
        }
        throw error;
      });
  }

  query(sql_string) {
    return this.connection.query(sql_string);
  }
}

module.exports = DB;
