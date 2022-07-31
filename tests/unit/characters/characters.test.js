const supertest = require("supertest")
const expect = require("chai").expect
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`


describe("API Characters", () => {
  const agent = supertest(URL);

  it("should retrieve all characters", async () => {
    const response = await agent.get("/characters");
    expect(response.status).to.equal(200);
  });

});
