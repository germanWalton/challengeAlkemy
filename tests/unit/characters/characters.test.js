const supertest = require("supertest");
const expect = require("chai").expect;
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`;

describe("API Characters", async (done) => {
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
      name: "Mickey",
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

  it("should return error if the image field does not exist ", async () => {
    const character = {
      name: "Minnie",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the image field is not a url ", async () => {
    const character = {
      name: "Minnie",
      image: "xxxx",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the image field is empty ", async () => {
    const character = {
      name: "Minnie",
      image: "",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the name does not have at least 3 characters", async () => {
    const character = {
      name: "xx",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the name field is empty", async () => {
    const character = {
      name: "",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the name field does not exist", async () => {
    const character = {
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });

  it("should return error if the age field does not exist", async () => {
    const character = {
      name:"Donald Duck",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the age field is empty", async () => {
    const character = {
      name: "Donald Duck",
      age:"",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the age field is not a number", async () => {
    const character = {
      name: "Donald Duck",
      age:"xxx",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });

  it("should return error if the weight field does not exist", async () => {
    const character = {
      name:"Donald Duck",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      age:24,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the weight field is empty", async () => {
    const character = {
      name: "Donald Duch",
      age: 24,
      weight:"",
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the weight field is not a number", async () => {
    const character = {
      name: "Donald Duch",
      age:34,
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: "xxx",
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the history field does not exist", async () => {
    const character = {
      name: "Donald Duch",
      age:46,
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 24
    
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the history field is empty", async () => {
    const character = {
      name: "Donald Duch",
      age:46,
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 96,
      history:""
    
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should return error if the history field does not have at least 50 characters", async () => {
    const character = {
      name: "Donald Duch",
      age:46,
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      weight: 96,
      history:"xxxxxxxxx"
    
    };
    const response = await agent
      .post("/characters")
      .set("Authorization", `Bearer ${token} `)
      .send(character);
    expect(response.status).to.equal(500);
  });
  it("should update a character", async () => {
    const id = 204;
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
    const id = 164;
    const response = await agent
      .delete(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(202);
  });
   it("should return not found if you try to delete a character that does not exist", async () => {
    const id = 154;
    const response = await agent
      .delete(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(404);
   });
  
  it("should return not found if you try to update a character that does not exist", async () => {
    const id = 154;
    const updateAge = { age: 26};
    const response = await agent
      .put(`/characters/${id}`)
      .set("Authorization", `Bearer ${token} `)
      .send(updateAge);

    expect(response.status).to.equal(404);
  });
  

  it("should return Unauthorized on get all characters", async () => {
    const response = await agent.get("/characters");
    expect(response.status).to.equal(401);
  });

  it("should return Unauthorized on get character by id", async () => {
    const id = 4;
    const response = await agent.get(`/characters/${id}`);
    expect(response.status).to.equal(401);
  });
  it("should return Unauthorized on create character", async () => {
    const character = {
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      name: "Minnie",
      age: 46,
      weight: 30,
      history:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    };
    const response = await agent.post("/characters").send(character);
    expect(response.status).to.equal(401);
  });
  it("should return Unauthorized on update a character", async () => {
    const id = 154;
    const updateAge = { age: 26 };
    const response = await agent.put(`/characters/${id}`).send(updateAge);

    expect(response.status).to.equal(401);
  });
  it("should return Unauthorized on delete a character", async () => {
    const id = 154;
    const response = await agent.delete(`/characters/${id}`);

    expect(response.status).to.equal(401);
  });
  done();
});
