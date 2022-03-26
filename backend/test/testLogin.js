process.env.NODE_ENV = "test";

const chai = require("chai");
let { expect, assert } = require("chai");
var jp = require("jsonpath");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../server");

describe("/POST Login", () => {
  it("should POST valid login details and get a cookie", (done) => {
    chai.request(server)
      .post("/api/login/")
      .send({
        username: "johnnyman",
        password: "papadog",
      })
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.a.cookie;
        assert.equal(
          res.body.user.username,
          "johnnyman",
          "The entered username should be the same"
        );
        assert.notEqual(
          res.body.user.pcleaassword,
          "papadog",
          "The password should be hashed"
        );
        assert.equal(
          res.body.user.type,
          "user",
          "The user should be a regular user"
        );
        done();
      });
  });

  it("should POST correct username and incorrect password and get code 401", (done) => {
    chai
      .request(server)
      .post("/api/login/")
      .send({
        username: "johnnyman",
        password: "wrongpassword",
      })
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.not.have.a.cookie;
        assert.equal(
          res.text,
          "Wrong password",
          "The response body should indicate that the password is incorrect"
        );
        done();
      });
  });

  it("it should POST a username that does not exist and get code 401", (done) => {
    chai
      .request(server)
      .post("/api/login/")
      .send({
        username: "asjdfiasjsafiasfj",
        password: "wrongpassword",
      })
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.not.have.a.cookie;
        assert.equal(
          res.text,
          "No matching username found",
          "The response body should indicate a matching username does not exist"
        );
        done();
      });
  });
});
