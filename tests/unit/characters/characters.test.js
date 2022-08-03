const supertest = require("supertest");
const expect = require("chai").expect;
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`;

describe("API Characters", async () => {
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

  it("should retrieve all characters", async () => {
    const response = await agent
      .get("/characters")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
  });

  it("should return a character by id", async () => {
    const id = 4;
    const response = await agent
      .get(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.body.id).to.equal(id);
  });

  it("should return not found if the character ID does not exist", async () => {
    const id = 6;
    const response = await agent
      .get(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(404);
  });

  it("should create a character", async () => {
    const character = {
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      name: "Donald Duck",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.body.name).to.equal(character.name);
  });



  it("should update a character", async () => {
    const id = 134;
    const updateAge = { age: 26};
    const response = await agent
      .put(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `)
      .send(updateAge);
    const updatedCharacter = await agent
      .get(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(201);
    expect(updatedCharacter.body.age).to.equal(updateAge.age);
  });
  it("should delete a character", async () => {
    const id = 134;
    const response = await agent
      .delete(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);
    
    expect(response.status).to.equal(202);
  });
});
