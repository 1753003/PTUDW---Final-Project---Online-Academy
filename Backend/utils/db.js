const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port: 3306,
      user: 'knwquy6r09jn4j0q',
      password: 'naqmb7foyvidvjjk',
      database: 'jok7rrqgjka2fkpa'
    }
  });
  
  module.exports = knex;