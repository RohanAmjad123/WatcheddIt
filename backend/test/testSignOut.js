const chai = require('chai');
const { expect, assert } = require('chai');
const jp = require('jsonpath');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api';
const connect = require('../database.js');

const session_key = '';

describe('POST /logout', () => {
  before(async () => {
    const res = await chai.request(url)
      .post('/login/')
      .send({
        username: 'johnnyman',
        password: 'papadog',
      })
      .set('Content-Type', 'application/json');
    const responseCookies = res.headers['set-cookie'];
    let requestCookies = '';
    for (let i = 0; i < responseCookies.length; i++) {
      let oneCookie = responseCookies[i];
      oneCookie = oneCookie.split(';');
      requestCookies = `${requestCookies + oneCookie[0]};`;
    }
    console.log(responseCookies);
  });
  // Test Case 07

  it('Logout with an existing session', async () => {
    res = await chai.request(url)
      .post('/logout/').send({ session_key })
      .set('Content-Type', 'application/json');
    expect(res).to.have.status(200);
    expect(res).to.not.have.a.cookie;
  });
});
