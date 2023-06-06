import request from "supertest";
import { expect } from "chai";
import { app } from "../index.js";
import nock from "nock";


describe("Test server Routes", () => {
  it("should respond with status 404 for GET request to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).to.equal(404);
  });

  it("should respond with status 404 for GET request to undefined route", async () => {
    const response = await request(app).get("/undefined-route");
    expect(response.statusCode).to.equal(404);
  });
});

describe("Test server Auth Routes", () => {
  it("should respond with status 200 for POST request to /signin", async () => {
    const response = await request(app)
      .post("/signin")
      .send({ user: "adrian", password: "pass"});
    expect(response.statusCode).to.equal(200);
  });

  it("should respond with status 200 for POST request to /signup", async () => {
    const response = await request(app)
      .post("/signup")
      .send({ user: "adrian", password: "pass" });
    expect(response.statusCode).to.equal(200);
  });
});

describe("Test server User Routes", () => {
  describe("Test server User Routes", () => {
    it("should respond with status 200 for GET request to /home", async () => {
      const fruits = [{ name: "apple" }, { name: "banana" }, { name: "orange" }];
      // Simulamos la respuesta exitosa de la API externa utilizando nock
      nock("https://fruityvice.com/api")
        .get("/fruit/all")
        .reply(200, fruits);
  
      const response = await request(app).get("/home");
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(fruits);
    });
  });
});

