/*import { User } from "../models/user.model.js";
import { expect } from "chai";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { home , profile } from "../controllers/user.controller.js";
import jsonwebtoken from "jsonwebtoken";
import axios from "axios";
import chaiHttp from "chai-http";
import spies from "chai-spies";

import chai from "chai";
import bcrypt from "bcryptjs";
import sinon from "sinon";
import { app } from "../index.js";

chai.use(chaiHttp);
chai.use(spies);*/

/*describe("UserController", () => {
  describe("profile", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should send user's fruits data with status 200 on success", async () => {
      const token = "token_";
      const user = "orlando";
      const foundUser = {
        user: "orlando",
        fruits: [{ name: "Apple" }, { name: "Banana" }]
      };
      sinon.stub(User, "findOne").resolves(foundUser);

      const req = {
        body: {
          token: token
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await profile(req, res);

      expect(User.findOne.calledWith({ user: user })).to.be.false;
      expect(res.status.calledWith(200)).to.be.false;
      expect(res.send.calledWith(foundUser.fruits)).to.be.false;
    });

    it("should send error message with status 500 on database error", async () => {
      const token = "token_";
      const user = "orlando";
      const errorMessage = "Database error";
      sinon.stub(User, "findOne").rejects({ message: errorMessage });

      const req = {
        body: {
          token: token
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await profile(req, res);

      expect(User.findOne.calledWith({ user: user })).to.be.false;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: errorMessage })).to.be.false;
    });

    it("should send 'User not found' message with status 404 when user is not found", async () => {
      const token = "token_";
      const user = "orlando";
      sinon.stub(User, "findOne").resolves(null);

      const req = {
        body: {
          token: token
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await profile(req, res);

      expect(User.findOne.calledWith({ user: user })).to.be.false;
      expect(res.status.calledWith(404)).to.be.false;
      expect(res.send.calledWith({ message: "User not found" })).to.be.false;
    });
  });
});*/

/*describe("Test server Auth Controllers", () => {
  describe("signUp", () => {
    it("should create a new user and return success message", async () => {
      const req = {
        body: {
          user: "adrian",
          password: "pass",
        },
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(200);
          return res;
        },
        send: (result) => {
          expect(result).to.deep.equal({ message: "User was registered successfully" });
        },
      };
      await signUp(req, res);
    });
    it("should handle error and return error message", async () => {
      const req = {
        body: {
          user: "adrian",
          password: "pass",
        },
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(500);
          return res;
        },
        send: (result) => {
          expect(result).to.deep.equal({ message: "Error occurred while registering user" });
        },
      };
      // Mock User.save to throw an error
      const saveStub = sinon.stub(User.prototype, "save").rejects(new Error("Save error"));
      await signUp(req, res);
      saveStub.restore();
    });
  });
  describe("signIn", () => {
    it("should return error message if user is not found", async () => {
      const req = {
        body: {
          user: "adrian",
          password: "pass",
        },
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(404);
          return res;
        },
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
          user: "adrian",
          password: "pass",
        },
      };
      const user = {
        password: bcrypt.hashSync("password", 8),
      };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(401);
          return res;
        },
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
          user: "adrian",
          password: "pass",
        },
      };
      const user = {
        user: "adrian",
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
});*/

/*describe("Test server User Controllers", () => {
  describe("home", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("should send fruits data with status 200 on success", async () => {
      const fruits = [{ name: "Apple" }, { name: "Banana" }];
      sinon.stub(axios, "get").resolves({ data: fruits });

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await home(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(fruits)).to.be.true;
    });
    it("should send error message with status 500 on failure", async () => {
      const error = "Internal Server Error";
      sinon.stub(axios, "get").rejects({ message: error });

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await home(req, res);

      expect(res.status.calledWith(500)).to.be.false;
      expect(res.send.calledWith({ message: error })).to.be.false;

      axios.get.restore();
    });
  });
});*/

// Importa las librerías necesarias
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from "../index.js";

// Configura Chai
chai.use(chaiHttp);
const expect = chai.expect;

// Pruebas para el controlador signUp
describe('signUp', () => {
  it('debería registrar un usuario correctamente', async () => {
    const newUser = {
      user: 'nuevo_usuario',
      password: 'contraseña',
      fruits: [1, 2]
    };

    const res = await chai.request(app)
      .post('/signup')
      .send(newUser);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('User was registered successfully');
  }).timeout(10000);
});

