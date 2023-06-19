const Database = require("./db");

class Util {
    constructor() {
        this.db = new Database();
    }

    async getEmployees() {
        return await this.db.query("SELECT * FROM employees");
    }
}

module.exports = Util;
