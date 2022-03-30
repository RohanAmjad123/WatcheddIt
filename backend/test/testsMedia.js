const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

const agent = chai.request.agent(server);

let dbConnect;

// before((done) => {
//   server.on('app_started', () => {
//     done();
//   });
// });

describe('Media tests', () => {
  //   before((done) => {
  //   agent.post('/api/login')
  //     .send({
  //       username: 'adminman',
  //       password: 'fakepass123',
  //     })
  //     .set('Content-Type', 'application/json')
  //     .end((err, res) => {
  //       expect(res).to.have.cookie('userId');
  //       done();
  //     });
  // });

  after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('Media').deleteMany({
      imdbID: 'test',
    }, (err) => {
      if (err) throw err;
      // connect.closeConnection();
      done();
    });
  });

  describe('/GET userId cookie', () => {
    it('should get a userId cookie', async () => {
      const res = await agent.post('/api/login')
        .send({
          username: 'adminman',
          password: 'fakepass123',
        })
        .set('Content-Type', 'application/json');
      expect(res).to.have.cookie('userId');
    });
  });

  // Test Case 58
  describe('/GET all media', () => {
    it('should retrieve all media', (done) => {
      agent.get('/api/media/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test Case 59
  describe('/GET a single media', () => {
    it('should retrieve a single media with valid imdbID', (done) => {
      agent.get('/api/media/tt0816692')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    // Test Case 60
    it('should return an error when retrieving a media with invalid imdbID', (done) => {
      agent.get('/api/media/bababooey')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // Test Case 61
  describe('/POST a valid media with valid session', () => {
    it('Posts a valid media with a valid session', (done) => {
      agent.post('/api/media/add')
        .set('Content-Type', 'application/json')
        .send({
          Title: 'test',
          Year: 'test',
          Genre: 'test',
          Plot: 'test',
          Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
          imdbID: 'test',
        }).end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test Case 62
  describe('/POST a valid media with an invalid session', () => {
    it('Posts a valid media with an invalid session', (done) => {
      chai.request(server)
        .post('/api/media/add')
        .set({ Cookie: 'nocookie' })
        .set('Content-Type', 'application/json')
        .send({
          Title: 'test',
          Year: 'test',
          Genre: 'test',
          Plot: 'test',
          Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
          imdbID: 'test',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
