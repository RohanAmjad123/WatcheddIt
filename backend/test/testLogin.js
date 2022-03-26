const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'

describe('/POST Login', function() {
  // Test Case 01
  it('Login with valid data', async function() {
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "johnnyman",
      "password": "papadog"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(200);
    expect(res).to.have.a.cookie
    assert.equal(res.body.user.username,'johnnyman', 'The entered username should be the same')
    assert.notEqual(res.body.user.password,'papadog', 'The password should be hashed')
    assert.equal(res.body.user.type, 'user', 'The user should be a regular user')
  })
  it('Login with correct username but incorrect password', async function() {
    // Test Case 02
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "johnnyman",
      "password": "wrongpassword"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(400);
    expect(res).to.not.have.a.cookie
    assert.equal(res.text, 'Wrong password', 'The response body should indicate that the password is incorrect');
  })
  it('Login with a username that does not exist', async function() {
    // Test Case 03
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "asjdfiasjsafiasfj",
      "password": "wrongpassword"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(400);
    expect(res).to.not.have.a.cookie
    assert.equal(res.text, 'No matching username found', 'The response body should indicate a matching username does not exist');
  })

})