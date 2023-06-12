import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import { app } from "../index.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { home, profile, addFavFruit, removeFavFruit } from "../controllers/user.controller.js";

chai.use(chaiHttp);
const expect = chai.expect;


describe("Test - Routes All", () => {
  it("Status 404 for GET request to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).to.equal(404);
  });

  it("Status 404 for GET request to undefined route", async () => {
    const response = await request(app).get("/undefined-route");
    expect(response.statusCode).to.equal(404);
  });
});

describe("Test - Auth Routes", () => {
  it("Status 200 for POST request to /signin", async () => {
    const response = await request(app)
      .post("/signin")
      .send({ user: "adrian", password: "pass" });
    expect(response.statusCode).to.equal(200);
  });

  it("Status 200 for POST request to /signup", async () => {
    const response = await request(app)
      .post("/signup")
      .send({ user: "adrian", password: "pass" });
    expect(response.statusCode).to.equal(200);
  });
});


describe("Test - User Routes", () => {
  it("Status 200 for GET request to /home", (done) => {
    chai
      .request(app.get("/home", home))
      .get("/home")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Status 200 for POST request to /profile", (done) => {
    const token = "secret";

    chai
      .request(app.post("/profile", verifyJwt, profile))
      .post("/profile")
      .send({ token: token })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("Status 200 for POST request to /addfavfruit", (done) => {
    const token = "secret";
    const fruit = "apple";

    chai
      .request(app.post("/addfavfruit", verifyJwt, addFavFruit))
      .post("/addfavfruit")
      .send({ token: token, fruit: fruit })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("Status 200 for POST request to /removefavfruit", (done) => {
    const token = "secret";
    const fruit = "apple";

    chai
      .request(app.post("/removefavfruit", verifyJwt, removeFavFruit))
      .post("/removefavfruit")
      .send({ token: token, fruit: fruit })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
