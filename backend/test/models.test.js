import { expect } from "chai";
import { app } from "../index.js";
import { User } from "../models/user.model.js";

describe("Test server User Models", () => {
  it("should create a new user with correct properties", () => {
    const userData = {
      user: "orlando",
      password: "pass",
      fruits: [2]
    };
    const newUser = new User(userData);
    expect(newUser.user).to.equal(userData.user);
    expect(newUser.password).to.equal(userData.password);
    expect(newUser.fruits).to.deep.equal(userData.fruits);

  });

  /*it("should validate required fields", () => {
    const newUser = new User();
    newUser.validate((validationError) => {
      expect(validationError.errors.user).to.exist;
      expect(validationError.errors.password).to.exist;
      expect(validationError.errors.fruits).to.exist;
    });
  });*/
});