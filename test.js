const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// //to get server
// const app = require("./server/app.js");
const { setupServer } = require("./server/app.js");
chai.should();
const data = require("./data/locations.json");
// const server = app();
const server = setupServer();
describe("FlyingK API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  // test for GET
  describe("/api/locations", () => {
    it("should return the full list of locations", async () => {
      // console.log("data[0]", data[0]);
      const response = await request.get("/api/locations");
      // console.log("response.body: ", response.body[0].Addresses);
      // console.log("data: ", data[0].Addresses);
      response.body[0].Addresses.should.eql(data[0].Addresses);
      // response.body.should.equal(data);
    });
  });
  //test for GET
  describe("/api/locations", () => {
    console.log("hello. here is in the test");
    it("should return filtered result, only states ", async () => {
      console.log("hello");
      //setup
      try {
        const response = await request.get("/api/locations/AL");
        console.log("res body: ", response.body);
        // select only matching data
        const filteredData = data.filter((el) => {
          return el.Addresses[0].State === "CO";
        });
        response.body.should.equal(filteredData);
        // console.log(response[0][0].name);
        // console.log("json: ", JSON.parse(response.text[0]));
      } catch {
        (error) => console.log(error);
      }
    });
  });
});
