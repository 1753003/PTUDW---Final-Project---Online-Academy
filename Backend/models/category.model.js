const knex = require("../utils/db");

const db = require('../utils/db');
module.exports = {
    getAll() {
        return db('category');
    }
};