const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'

describe('/POST Login', function() {
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
    assert(res.body.username == 'johnnyman', 'The entered username should be the same')
    assert(res.body.password != 'papadog', 'The password should be hashed')
    assert(res.body.type == 'user', 'The user should be a regular user')
  })
  it('Login with correct username but incorrect password', async function() {
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "johnnyman",
      "password": "wrongpassword"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(400);
    expect(res).to.not.have.a.cookie
   // assert(res.body == 'Wrong password', 'The response body indicates that the password is incorrect');
  })
  it('Login with a username that does not exist', async function() {
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "asjdfiasjsafiasfj",
      "password": "wrongpassword"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(400);
    expect(res).to.not.have.a.cookie
   // assert(res.body == 'Wrong password', 'The response body indicates that the password is incorrect');
  })

})