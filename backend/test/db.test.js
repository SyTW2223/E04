import { url } from "../config/db.js";
import mongoose from "mongoose";
import { expect } from "chai";

describe("Database Connection", () => {
  it("should connect to the database", (done) => {
    mongoose.connect(url)
      .then(() => {
        expect(mongoose.connection.readyState).to.equal(1); // 1 indicates connected state
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});