import request from "supertest";
import { expect } from "chai";
import { app } from "../index.js";
import { User } from "../models/user.model.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";

import jsonwebtoken from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import sinon from "sinon";

import { signUp, signIn } from "../controllers/auth.controller.js";

describe("Test server", () => {
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
      .send({ user: "orlando", password: "pass" });
    expect(response.statusCode).to.equal(200);
  });

  it("should respond with status 200 for POST request to /signup", async () => {
    const response = await request(app)
      .post("/signup")
      .send({ user: "orlando", password: "pass" });
    expect(response.statusCode).to.equal(200);
  });

  describe("Test server User Models", () => {
    it("should create a new user with correct properties", () => {
      const userData = {
        user: "orlando",
        password: "pass",
      };
      const newUser = new User(userData);
      expect(newUser.user).to.equal(userData.user);
      expect(newUser.password).to.equal(userData.password);
    });
  
    it("should validate required fields", () => {
      const newUser = new User();
      const validationError = newUser.validateSync();
      expect(validationError.errors.user).to.exist;
      expect(validationError.errors.password).to.exist;
    });
  });

  describe("Test server Auth Controllers", () => {
    describe("signUp", () => {
      it("should create a new user and return success message", async () => {
        const req = {
          body: {
            user: "orlando",
            password: "pass",
          },
        };
        const res = {
          send: (result) => {
            expect(result).to.deep.equal({ message: "User was registered successfully" });
          },
        };
        await signUp(req, res);
      });
  
      it("should handle error and return error message", async () => {
        const req = {
          body: {
            user: "orlando",
            password: "pass",
          },
        };
        const res = {
          send: (result) => {
            expect(result).to.deep.equal({ message: "Error occurred while registering user" });
          },
        };
        // Mock User.save to throw an error
        const saveStub = sinon.stub(User.prototype, "save").rejects();
        await signUp(req, res);
        saveStub.restore();
      });
    });
  
    describe("signIn", () => {
      it("should return error message if user is not found", async () => {
        const req = {
          body: {
            user: "orlando",
            password: "pass",
          },
        };
        const res = {
          send: (result) => {
            expect(result).to.deep.equal({ message: "User not found" });
          },
        };
        // Mock User.findOne to return null (user not found)
        const findOneStub = sinon.stub(User, "findOne").resolves(null);
        await signIn(req, res);
        findOneStub.restore();
      });
  
      it("should return error message if password is invalid", async () => {
        const req = {
          body: {
            user: "orlando",
            password: "pass",
          },
        };
        const user = {
          password: bcrypt.hashSync("password", 8),
        };
        const res = {
          send: (result) => {
            expect(result).to.deep.equal({ message: "Invalid password" });
          },
        };
        // Mock User.findOne to return user with a different password
        const findOneStub = sinon.stub(User, "findOne").resolves(user);
        await signIn(req, res);
        findOneStub.restore();
      });
  
      it("should return token if user is found and password is valid", async () => {
        const req = {
          body: {
            user: "orlando",
            password: "pass",
          },
        };
        const user = {
          user: "orlando",
          password: bcrypt.hashSync("pass", 8),
        };
        const res = {
          send: (result) => {
            expect(result).to.have.property("token");
          },
        };
        // Mock User.findOne to return user with matching password
        const findOneStub = sinon.stub(User, "findOne").resolves(user);
        await signIn(req, res);
        findOneStub.restore();
      });
    });
  });
  describe('Test server VerifyJwt', () => {
    it('should send "No token provided" if no token is provided', () => {
      const req = { body: {} };
      const res = {
        send: (response) => {
          expect(response.message).to.equal('No token provided');
        },
      };
      verifyJwt(req, res);
    });
    it('should send the error message if the token verification fails', () => {
      const token = jsonwebtoken.sign({ userId: 1 }, 'invalid-secret');
      const req = { body: { token } };
      const res = {
        send: (response) => {
          expect(response.message).to.equal('invalid signature');
        },
      };
      verifyJwt(req, res);
    });  
  });
});