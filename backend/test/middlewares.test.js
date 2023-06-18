import { expect } from "chai";
import { app } from "../index.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import jsonwebtoken from 'jsonwebtoken';

describe('Tests - VerifyJwt', () => {
  it('Status 403 if send "No token provided" if no token is provided', () => {
    const req = { body: {}, headers: {} }; // Asegúrate de incluir el objeto body vacío
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(403);
        return res;
      },
      send: (response) => {
        expect(response.message).to.equal('No token provided');
      },
    };
    verifyJwt(req, res, () => { });
  });

  it('Status 403 if send the error message if the token verification fails', () => {
    const token = jsonwebtoken.sign({ userId: 1 }, 'invalid-secret');
    const req = { body: {}, headers: { authorization: token } }; // Asegúrate de incluir el objeto body vacío
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(403);
        return res;
      },
      send: (response) => {
        expect(response.message).to.equal('No token provided');
      },
    };
    verifyJwt(req, res, () => { });
  });
});