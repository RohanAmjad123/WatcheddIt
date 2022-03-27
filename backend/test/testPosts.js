const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

const agent = chai.request.agent(server);

let dbConnect;

describe('Post tests', () => {
  before((done) => {
    server.on('app_started', () => {
      done();
    });

    agent.post('/api/login')
      .send({
        username: 'johnnyman',
        password: 'papadog',
      })
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.cookie('userId');
        done();
      });
  });

  // Removes inserted documents
  after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('PostEvents').deleteMany({
      user: 'johnnyman',
    }, (err) => {
      if (err) throw err;
      connect.closeConnection();
    });
    agent.close();
    done();
  });

  // Test Case 08
  describe('/POST Post a post with valid session and data', () => {
    it('should post a post and get code 200', (done) => {
      agent.post('/api/post/add')
        .set('Content-Type', 'application/json')
        .send({
          title: 'test',
          description: 'test',
          user: 'johnnyman',
          imdbID: 'tt5180504',
          votes: {
            upvotes: 0,
            downvotes: 0,
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test Case 09
  describe('/POST Post a post with an invalid session but valid data', () => {
    it('should fail send code 401', (done) => {
      chai.request(server)
        .post('/api/post/add')
        .set('Content-Type', 'application/json')
        .send({
          title: 'test',
          description: 'test',
          user: 'johnnyman',
          imdbID: 'tt5180504',
          votes: {
            upvotes: 0,
            downvotes: 0,
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't POST post, not logged in", 'The response body does not match');
          done();
        });
    });
  });

  // Test Case 10
  describe('/GET all posts', () => {
    it('should return all posts', (done) => {
      chai.request(server)
        .get('/api/posts/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test Case 11
  describe('/GET a singular post', () => {
    it('should retrieve a singular valid post', (done) => {
      chai.request(server)
        .get('/api/media/tt0816692/post/623aef7010ebb643f5d9c272')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.not.equal(null);
          done();
        });
    });
  });

  // Test Case 12
  describe('/GET a post with invalid IMDB id and valid postID', () => {
    it('should retrieve an empty object', (done) => {
      chai.request(server)
        .get('/api/media/abc/post/623aef7010ebb643f5d9c272')
        .end((err, res) => {
          expect(res).to.not.have.status(200);
          expect(res).to.have.empty(res.body);
          done();
        });
    });
  });

  // Test Case 13
  describe('/GET a post with valid IMDB id and invalid postID', () => {
    it('should retrieve and empty object', (done) => {
      chai.request(server)
        .get('/api/media/tt0816692/post/abc')
        .end((err, res) => {
          expect(res).to.not.have.status(200);
          done();
        });
    });
  });

  // Test Case 14
  describe('/PUT edit a valid post', () => {
    it('should edit a valid post', (done) => {
      agent.put('/api/post/update/623aef7010ebb643f5d9c272')
        .set('Content-Type', 'application/json')
        .send({
          data: {
            title: 'The ending was insane!',
            description: 'The ending of the movie was such a plot twist!',
            user: 'RohanAmjad123',
            imdbID: 'tt0816692',
            votes: {
              upvotes: 0,
              downvotes: 0,
            },
          },
          user: 'RohanAmjad123',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
