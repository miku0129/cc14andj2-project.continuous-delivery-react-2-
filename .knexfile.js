//test
require("dotenv").config();

const config = {
  client: "postgresql",
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/data`,
  },
};
module.exports = {
  development: {
    ...config,
    connection: {
      connectionString:
        "postgres://postgres:Miku3039@[::1]:5432/truckstop" ||
        // "postgres://postgres:Miku3039@localhost:5432/truckstop" ||
        // connection: process.env.DATABASE_URL,
        `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/truckstop`,
      // `postgres://${process.env.USER}@localhost:5432/truckstop`,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    },
    // connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/data`,
    },
  },
};

// this is configiration file for knex
//changed
