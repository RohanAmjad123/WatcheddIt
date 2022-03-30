const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

const agent = chai.request.agent(server);

let dbConnect;

describe('Post tests', () => {
  // before(async (done) => {
  //   server.on('app_started', () => {
  //     done();
  //   });
  // });

  // Removes inserted documents
  after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('PostEvents').deleteMany({
      user: 'testuser123',
    }, (err) => {
      if (err) throw err;
    });
    done();
  });

  describe('/GET userId cookie', () => {
    it('should get a userId cookie', async () => {
      const res = await agent.post('/api/login')
        .send({
          username: 'testuser123',
          password: 'pass',
        })
        .set('Content-Type', 'application/json');
      expect(res).to.have.cookie('userId');
    });
  });

  describe('/POST Post a post with valid session and data', () => {
    // Test Case 15
    it('should post a post and get code 200', (done) => {
      agent.post('/api/post/add')
        .set('Content-Type', 'application/json')
        .send({
          postID: '123ae75910ebb643f5d9c270',
          title: 'test',
          description: 'test',
          user: 'testuser123',
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

  describe('/POST Post a post with an invalid session but valid data', () => {
    // Test Case 16
    it('should fail send code 401', (done) => {
      chai.request(server)
        .post('/api/post/add')
        .set('Content-Type', 'application/json')
        .send({
          title: 'test',
          description: 'test',
          user: 'testuser123',
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

  describe('/GET all posts', () => {
    // Test Case 17
    it('should return all posts', (done) => {
      chai.request(server)
        .get('/api/posts/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/GET posts', () => {
    // Test Case 18
    it('should retrieve a singular valid post', (done) => {
      chai.request(server)
        .get('/api/media/tt0816692/post/623aef7010ebb643f5d9c272')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.not.equal(null);
          done();
        });
    });

    // Test Case 19
    it('should retrieve all posts under a specific imdbID', (done) => {
      chai.request(server)
        .get('/api/posts/tt0816692')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    // Test Case 20
    it('should return 200 and all posts a user has voted on', (done) => {
      agent
        .get('/api/myvoted')
        .end((err, res) => {
          expect(res).to.have.status(200);
          assert.equal(res.body.length, 2, 'It should return an array of two posts');
          done();
        });
    });

    // Test Case 21
    it('should return 401 and zero posts if no user is logged in', (done) => {
      const agentt = chai.request.agent(server);
      agentt
        .get('/api/myvoted')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, 'You are currently not logged in', 'It should return zero posts');
          done();
        });
    });
  });

  // // Test Case 22
  describe('/GET a post with invalid IMDB id and valid postID', () => {
    it('should retrieve an empty object', (done) => {
      chai.request(server)
        .get('/api/media/abc/post/623aef7010ebb643f5d9c272')
        .end((err, res) => {
          expect(res).to.not.have.status(500);
          done();
        });
    });
  });

  // Test Case 23
  describe('/GET a post with valid IMDB id and invalid postID', () => {
    it('should retrieve and empty object', (done) => {
      chai.request(server)
        .get('/api/media/tt0816692/post/sss272')
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  // Test Case 24
  describe('/PUT post', () => {
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

    // Test Case 25
    it('should fail when edit a valid post but with an invalid session', (done) => {
      chai.request(server)
        .put('/api/post/update/623aef7010ebb643f5d9c272')
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
          expect(res).to.have.status(401);
          done();
        });
    });

    // Test Case 26
    it('should fail when edit an invalid post but with valid post data', (done) => {
      agent.put('/api/post/update/623aef7010ebbabvf5d9c272')
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
          expect(res).to.have.status(400);
          done();
        });
    });

    // Test Case 27
    it('Delete a valid post', (done) => {
      agent.post('/api/post/delete/123ae75910ebb643f5d9c270')
        .set('ContentType', 'application/json')
        .send({
          text: 'testing for delete comment',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
