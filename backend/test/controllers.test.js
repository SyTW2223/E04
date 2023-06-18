import { User } from "../models/user.model.js";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { home , profile, addFavFruit, removeFavFruit} from "../controllers/user.controller.js";
import jsonwebtoken from "jsonwebtoken";
import Axios from "axios";
import chaiHttp from "chai-http";
import assert from 'assert';
import chai from "chai";
import sinon from "sinon";
import { app } from "../index.js";
 
//Configura Chai
chai.use(chaiHttp);
const expect = chai.expect;


describe("Tests - User Controller", () => {
  describe('GET /home', function() {
    afterEach(function() {
      sinon.restore();
    });
  
    it('Status 200 if return a list of fruits', function(done) {
      const fruitData = [{ name: 'Apple' }, { name: 'Banana' }];
  
      const axiosStub = sinon.stub(Axios, 'get').resolves({ data: fruitData });
  
      const req = {};
      const res = {
        status: function(code) {
          assert.strictEqual(code, 200, 'Response status should be 200');
          return this;
        },
        send: function(data) {
          assert.deepStrictEqual(data, fruitData, 'Response data should match');
          done();
        }
      };
      home(req, res);
  
      assert.strictEqual(axiosStub.callCount, 1, 'Axios.get should be called once');
      assert.strictEqual(axiosStub.firstCall.args[0], 'https://fruityvice.com/api/fruit/all', 'Axios.get should be called with the correct URL');
    });
  
    it('Status 500 if handle error when fetching fruits', function(done) {
      const errorMessage = 'Failed to fetch fruits';
  
      const axiosStub = sinon.stub(Axios, 'get').rejects(new Error(errorMessage));
  
      const req = {};
      const res = {
        status: function(code) {
          assert.strictEqual(code, 500, 'Response status should be 500');
          return this;
        },
        send: function(data) {
          assert.deepStrictEqual(data, { message: errorMessage }, 'Error message should match');
          done();
        }
      };
      home(req, res);
  
      assert.strictEqual(axiosStub.callCount, 1, 'Axios.get should be called once');
      assert.strictEqual(axiosStub.firstCall.args[0], 'https://fruityvice.com/api/fruit/all', 'Axios.get should be called with the correct URL');
    });
  });

  describe('POST /addFavFruit', () => {
    it('Status 200 for POSTif add a favorite fruit for the user', async () => {
      const token = 'secret'; 
      const user = 'adrian';
      const fruit = 'apple';
  
      const updateOneStub = sinon.stub(User, 'updateOne').resolves();
  
      const req = { body: { token, fruit } };
      const res = {
        status: function(code) {
          expect(code).to.equal(400);
          return this;
        },
        send: function() {
          expect(updateOneStub.calledOnce).to.be.false;
        }
      };
  
      await addFavFruit(req, res);
  
      updateOneStub.restore();
    });
  
    it('Status 400 if there is an error', async () => {
      const token = 'secret';
      const user = 'adrian';
      const fruit = 'apple';
      const error = new Error('Failed to add favorite fruit');
  
      const updateOneStub = sinon.stub(User, 'updateOne').rejects(error);
  
      const req = { body: { token, fruit } };
      const res = {
        status: function(code) {
          expect(code).to.equal(400);
          return this;
        },
        send: function(data) {
          expect(updateOneStub.calledOnce).to.be.false;
        }
      };
  
      await addFavFruit(req, res);
  
      updateOneStub.restore();
    });
  });
  
  describe('POST /removeFavFruit', () => {
    it('Status 200 if remove a favorite fruit for the user', async () => {
      const token = 'secret';
      const user = 'adrian';
      const fruit = 'apple';
  
      const updateOneStub = sinon.stub(User, 'updateOne').resolves();
  
      const req = { body: { token, fruit } };
      const res = {
        status: function(code) {
          expect(code).to.equal(400);
          return this;
        },
        send: function() {
          expect(updateOneStub.calledOnce).to.be.false;
        }
      };
  
      await removeFavFruit(req, res);
  
      updateOneStub.restore();
    });
  
    it('Status 500 if there is an error', async () => {
      const token = 'secret';
      const user = 'adrian';
      const fruit = 'apple';
      const error = new Error('Failed to remove favorite fruit');
  
      const updateOneStub = sinon.stub(User, 'updateOne').rejects(error);
  
      const req = { body: { token, fruit } };
      const res = {
        status: function(code) {
          expect(code).to.equal(400);
          return this;
        },
        send: function(data) {
          expect(updateOneStub.calledOnce).to.be.false;
        }
      };
  
      await removeFavFruit(req, res);
  
      updateOneStub.restore();
    });
  });
});

describe("Test - Auth Controller", () => {
  describe("POST /signin", () => {
    it('Status 200 if the user is registered', async () => {
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
    });

    it("Status 200 if existing user", async () => {
      const user = {
        user: "testuser",
        password: "password123",
      };
      await chai
        .request(app)
        .post("/signup")
        .send(user);

      const response = await chai
        .request(app)
        .post("/signin")
        .send(user);

      expect(response).to.have.status(200);
      expect(response.body.token).to.exist;

      // Verificar que el token es válido
      const decodedToken = jsonwebtoken.verify(response.body.token, "secret");
      expect(decodedToken.user).to.equal(user.user);
    });
    it("Status 404 if user is not found", async () => {
      const user = {
        user: "nonexistentuser",
        password: "password123",
      };

      const response = await chai
        .request(app)
        .post("/signin")
        .send(user);

      expect(response).to.have.status(404);
      expect(response.body.message).to.equal("User not found");
    });

    it("Status 401 if password is invalid", async () => {
      const user = {
        user: "testuser",
        password: "incorrectpassword",
      };

      const response = await chai
        .request(app)
        .post("/signin")
        .send(user);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal("Invalid password");
    });
  });

  describe("POST /signup", () => {
    it("Status 200 if a new user registers", async () => {
      const user = {
        user: "adrian",
        password: "pass",
        fruits: [1, 2],
      };
  
      const response = await chai
        .request(app)
        .post("/signup")
        .send(user);
  
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("User was registered successfully");
  
      // Verificar que el usuario existe en la base de datos
      const registeredUser = await User.findOne({ user: user.user });
      expect(registeredUser).to.exist;
      expect(registeredUser.user).to.equal(user.user);
    });

    it("Status 500 if an error occurs during user registration", async () => {
      const user = {
        user: "newuser",
        password: "password123",
        fruits: [1, 2],
      };

      // Forzar un error al guardar el usuario en la base de datos
      sinon.stub(User.prototype, "save").throws();

      const response = await chai
        .request(app)
        .post("/signup")
        .send(user);

      expect(response).to.have.status(500);
      expect(response.body.message).to.equal("Error occurred while registering user");

      User.prototype.save.restore();
    });
  });
});