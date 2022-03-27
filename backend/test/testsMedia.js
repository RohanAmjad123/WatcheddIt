const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

var agent = chai.request.agent(server);

let dbConnect;

let session_key

before((done) => {
    server.on('app_started', () => {
        done();
})
})

describe('Media tests', () => {


    before((done) => {
        agent.post('/api/login')
          .send({
            username: 'adminman',
            password: 'fakepass123',
          })
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res).to.have.cookie('userId');
            done();
          });
      });

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

      it('Get all the media', (done) => {
        agent.get('/api/media/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    })

    it('Get a single media with valid imdbID', (done) => {
        agent.get('/api/media/tt0816692')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    })

    it('Posts a valid media with a valid session', (done) => {
        agent
        .post('/api/media/add')
        .set('Content-Type', 'application/json')
        .send({
            "Title": "test",
            "Year": "test",
            "Genre": "test",
            "Plot": "test",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "imdbID": "test",
        }).end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it('Posts a valid media with an invalid session',  (done) => {
        agent = chai.request.agent(server);
        agent
        .post('/api/media/add')
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
        .end((err, res) => {
            expect(res).to.have.status(401);
            done();
        })
    })




})