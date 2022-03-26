const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
var mongoose = require('mongoose');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'
const connect = require("../database.js")

var session_key = ''

describe('POST /logout', function () {

    before(async() => {
        let res = await chai.request(url)
        .post('/login/')
        .send({
          "username": "johnnyman",
          "password": "papadog"
        })
        .set('Content-Type', 'application/json')
        var responseCookies = res.headers['set-cookie']
        var requestCookies='';
        for(var i=0; i<responseCookies.length; i++){
            var oneCookie = responseCookies[i];
            oneCookie = oneCookie.split(';');
            requestCookies= requestCookies + oneCookie[0]+';';
        }
        console.log(responseCookies)
    })
    // Test Case 07

    it('Logout with an existing session', async function() {
        res = await chai.request(url)
        .post('/logout/').send({"session_key": session_key})
        .set('Content-Type', 'application/json')
        expect(res).to.have.status(200);
        expect(res).to.not.have.a.cookie
    })

})