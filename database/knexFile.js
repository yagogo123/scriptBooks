const knex = require("knex")
require('dotenv').config();
module.exports = {
  async connect() {
    return await knex({
      client: "pg",
      connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
      }
    });
  }
}
