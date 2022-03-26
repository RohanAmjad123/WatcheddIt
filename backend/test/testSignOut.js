const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
var mongoose = require('mongoose');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'
const connect = require("../database.js")

describe('POST /logout', function () {

    it('Logout with an existing session', async function() {
        let res = await chai.request(url)
        .post('/login/')
        .send({
          "username": "johnnyman",
          "password": "papadog"
        })
        .set('Content-Type', 'application/json')
        expect(res).to.have.a.cookie
        res = await chai.request(url)
        .post('/logout/')
        .set('Content-Type', 'application/json')
        expect(res).to.have.status(200);
        expect(res).to.not.have.a.cookie
    })

})