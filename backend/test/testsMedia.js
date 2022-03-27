const chai = require('chai');
const { expect, assert } = require('chai');
const jp = require('jsonpath');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api';
const connect = require('../database.js');
let dbConnect;

// Retrieves the cookie
before(async () => {
    let res = await chai.request(url)
      .post('/login/')
      .send({
        username: 'adminman',
        password: 'fakepass123'
      })
      .set('Content-Type', 'application/json');
    var responseCookies = res.headers['set-cookie'].pop().split(';')[0];
    session_key = responseCookies;
    await connect.connect();
  });



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

describe('POST /media', () => {
    it('Posts a valid media with a valid session', async () => {
        res = await chai.request(url)
        .post('/media/add')
        .set({'Cookie': session_key})
        .set('Content-Type', 'application/json')
        .send({
            "Title": "test",
            "Year": "test",
            "Genre": "test",
            "Plot": "test",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "imdbID": "test",
        })
        expect(res).to.have.status(200);
    })

    it('Posts a valid media with an invalid session', async () => {
        res = await chai.request(url)
        .post('/media/add')
        .set({'Cookie': 'nocookie'})
        .set('Content-Type', 'application/json')
        .send({
            "Title": "test",
            "Year": "test",
            "Genre": "test",
            "Plot": "test",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "imdbID": "test",
        })
        expect(res).to.have.status(401);
    })


})

after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('Media').deleteMany({
        imdbID: 'test'
      }, function (err, result)
           {
        if (err) throw err;
        connect.closeConnection();
        done();
      });
  });