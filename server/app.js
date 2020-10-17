// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");

//add setupServer for test
const setupServer = () => {
  const app = express();
  // Setup logger
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
  );

  // Serve static assets
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("/api/locations", async (req, res) => {
    try {
      // console.log("🚗");
      const locations = await db.select().table("locations");
      res.send(locations);
    } catch (err) {
      console.error("Error loading locations!", err);
      res.sendStatus(500);
    }
  });

  // get data base on State
  app.get("/api/locations/:state", async (req, res) => {
    console.log("hello. here is in app");
    const state = req.params.state;
    const allLocation = await db.select().table("locations");
    const result = allLocation.filter((element) => {
      return element.Addresses[0].State === state;
    });
    // console.log("result: ", result);
    res.send(result);
  });

  // get data base on City
  app.get("/api/locations/:city", async (req, res) => {
    const city = req.params.city;
    const allLocation = await db.select().table("locations");

    const result = allLocation.filter((element) => {
      return element.Addresses[0].City === city;
    });
    res.send(result);
  });

  //get data based on City & State
  app.get("/api/locations/:state/:city", async (req, res) => {
    const city = req.params.city;
    const state = req.params.state;
    const allLocation = await db.select().table("locations");

    const result = allLocation.filter((element) => {
      return (
        element.Addresses[0].City === city &&
        element.Addresses[0].State === state
      );
    });
    res.send(result);
  });

  // Always return the main index.html, so react-router render the route in the client
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });

  //add return for setupServer
  return app;
};

// module.exports = app;
module.exports = { setupServer };
