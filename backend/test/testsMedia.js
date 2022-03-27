const chai = require('chai');
const { expect, assert } = require('chai');
const jp = require('jsonpath');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api';
const connect = require('../database.js');


describe('GET /media', () => {
    it('Get all the media', async() => {
        res = await chai.request(url)
        .get('/media/')
        
        expect(res).to.have.status(200);
    })
    it('Get a single media with valid imdbID', async() => {
        res = await chai.request(url)
        .get('/media/tt0816692')

        expect(res).to.have.status(200);
    })

    it('Get a single media with invalid imdbID', async() => {
        res = await chai.request(url)
        .get('/media/invalid')
        expect(res).to.have.status(400);
        assert(res.text,"No such requested imdbID was found", "Response should alert" +
         " user that requsted imdbID was not found" )
    })
})