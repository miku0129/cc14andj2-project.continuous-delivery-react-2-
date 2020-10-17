require("dotenv").config();

const config = {
  client: "postgresql",
  migrations: {
    directory: __dirname + "/migrations",
  },
  seeds: {
    directory: __dirname + "/data",
  },
};
module.exports = {
  development: {
    ...config,
    connection: {
      connectionString: `postgres://${process.env.USER}@127.0.0.1:5432/truckstop`,
    },
  },
  production: {
    ...config,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};

// this is configiration file for knex
//changed
