const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/POST Login', function() {
  it('Login with valid data', async function() {
    let res = await chai.request('http://127.0.0.1:3000/api')
    .post('/login/')
    .send({
      "username": "johnnyman",
      "password": "papadog"
    })
    .set('Content-Type', 'application/json')
    expect(res).to.have.status(200);
  })
})