
const supertest = require("supertest");
const expect = require("chai").expect;
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`;

describe("API Characters", () => {
  const agent = supertest(URL);

  it("should retrieve all characters", async () => {
    const { token } = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    const response = await agent
      .get("/characters")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
    
  });

  it("should return a character by id", async () => {
    const id = 4
    const { token } = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    const response = await agent
      .get(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.body.id).to.equal(id);
  });

  it("should create a character", async () => {
    const { token } = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    const character = {
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      name: "Elsa",
      age: 25,
      weight: 50,
      history: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.body.name).to.equal(character.name);

  });
  it("should update a character", async () => {
    const { token } = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    const id = 84;
    const updateName = { name: 'Elsa Frozen 4'};
    const response = await agent.put(`/characters/${id}`).set("Authorization", `Bearer ${token} `).send(updateName);
    const updatedCharacter = await agent.get(`/characters/${id}`).set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(201);
     expect(updatedCharacter.body.name).to.equal(updateName.name);
  });
  it("should delete a character", async () => {
    const { token } = (
      await agent
        .post("/auth/login")
        .send({ email: "waltongerman@gmail.com", password: "123456" })
    ).body;
    const id = 84;
    const response = await agent.delete(`/characters/${id}`).set("Authorization", `Bearer ${token} `)

    expect(response.status).to.equal(202);
  });
});
