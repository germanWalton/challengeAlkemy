const supertest = require("supertest");
const expect = require("chai").expect;
const config = require("../../../src/config");
const PORT = config.port;
const URL = `http://localhost:${PORT}`;

describe("API Movies", async (done) => {
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

  it("should retrieve all movies", async () => {
    const response = await agent
      .get("/movies")
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
  });

  it("should return a movie by id", async () => {
    const id = 234;
    const response = await agent
      .get(`/movies/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.body.id).to.equal(id);
  });

  it("should create a movie", async () => {
    const movie = {
      image:
        "https://static.wikia.nocookie.net/frozen/images/4/4a/Elsa.png/revision/latest?cb=20170824042305&path-prefix=es",
      title: "Lion King",
      creationDate: 2013-04-22,
      score: 5,
      gender:"Fantasy",
    };
    const response = await agent
      .post("/movies")
      .set("Authorization", `Bearer ${token} `)
      .send(movie);
    expect(response.body.title).to.equal(movie.title);
  });
  it("should update a movie", async () => {
    const id = 394;
    const updateTitle = { title: "Rey León" };
    const response = await agent
      .put(`/movies/${id}`)
      .set("Authorization", `Bearer ${token} `)
      .send(updateTitle);
    const updatedMovie = await agent
      .get(`/movies/${id}`)
      .set("Authorization", `Bearer ${token} `);

    expect(response.status).to.equal(200);
    expect(updatedMovie.body.title).to.equal(updateTitle.title);
  });
  it("should delete a  movie", async () => {
    const id = 334;
    const response = await agent
      .delete(`/movies/${id}`)
      .set("Authorization", `Bearer ${token} `);
    expect(response.status).to.equal(200);
  });
  done()
});
