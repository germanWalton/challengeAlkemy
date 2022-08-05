const supertest = require("supertest");
const expect = require("chai").expect;
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`;

describe("API Users", async (done) => {
  const agent = supertest(URL);
  let token = null;
  before(async () => {
    const response = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    token = response.token;
  });

  it("should retrieve all users", async () => {
    const response = await agent
      .get("/users")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
  });

  it("should return a user by id", async () => {
    const id = 224;
    const response = await agent
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.body.id).to.equal(id);
  });

  it("should create a user", async () => {
    const user = {
     password:"123456",
      name: "Landax",
      email:"landalandax@gmail.com"
    };
    const response = await agent
      .post("/users")
      .set("Authorization", `Bearer ${token} `)
      .send(user);
    expect(response.body.name).to.equal(user.name);
  });
  it("should update a user", async () => {
    const id = 264;
    const updateName = { name: "John" };
    const response = await agent
      .put(`/users/${id}`)
      .set("Authorization", `Bearer ${token} `)
      .send(updateName);
    const updatedUser = await agent
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(200);
    expect(updatedUser.body.name).to.equal(updateName.name);
  });
  it("should delete a user", async () => {
    const id = 294;
    const response = await agent
      .delete(`/users/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
  });
  done()
});
