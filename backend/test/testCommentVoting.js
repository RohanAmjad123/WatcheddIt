const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect, assert } = require('chai');

chai.use(chaiHttp);

const server = require('../server');

const agent = chai.request.agent(server);

describe('Comment Voting Tests', () => {
  // Retrieve cookie
  before((done) => {
    server.on('app_started', () => {
      done();
    });
  });

  after((done) => {
    agent.close();
    done();
  });

  // // Remove inserted documents
  // after(function (done) {
  //     dbConnect = connect.getDb()
  //     dbConnect.collection("PostEvents")
  //         .deleteMany({
  //             user: "johnnyman"
  //         }, function (err, result) {
  //             if (err) throw err;
  //             done();
  //         })
  // })

  describe('/GET userId cookie', () => {
    it('should get a userId cookie', async () => {
      const res = await agent.post('/api/login')
        .send({
          username: 'johnnyman',
          password: 'papadog',
        })
        .set('Content-Type', 'application/json');
      expect(res).to.have.cookie('userId');
    });
  });

  describe('/GET valid total votes', () => {
    it('should get total votes', (done) => {
      chai.request(server)
        .get('/api/comments/623d71eb0af2e4f21b42a701/voting')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/GET total votes of invalid postID', () => {
    it('should get nothing', (done) => {
      chai.request(server)
        .get('/api/comments/623d71eb0af2e4f21b42a701/voting')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal('');
          done();
        });
    });
  });

  describe('/GET a users vote for a comment with valid credentials', () => {
    it('should get the users vote', (done) => {
      agent.get('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/GET a users vote for a comment with invalid credentials', () => {
    it('should not return a vote and return code 401', (done) => {
      chai.request(server)
        .get('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't GET comment vote, not logged in");
          done();
        });
    });
  });

  describe('/POST a user vote with valid credentials', () => {
    it('should comment a user vote', (done) => {
      agent.post('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .set('Content-Type', 'application/json')
        .send({
          vote: true,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/POST a user vote with invalid credentials', () => {
    it('should not comment a user vote and return code 401', (done) => {
      chai.request(server)
        .post('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .send({
          vote: 3,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't POST comment vote, not logged in");
          done();
        });
    });
  });

  describe('/POST an invalid user vote with valid credentials', () => {
    it('should not comment a user vote and return code 401', (done) => {
      agent.post('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .set('Content-Type', 'application/json')
        .send({
          vote: 2,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(res.text, 'Error - Invalid Vote Value');
          done();
        });
    });
  });

  describe('/PUT a user vote with valid credentials', () => {
    it('put user vote', (done) => {
      agent.put('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .set('Content-Type', 'application/json')
        .send({
          vote: false,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/PUT a user vote with invalid credentials', () => {
    it('should not put auser vote and return code 401 ', (done) => {
      chai.request(server)
        .put('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .send({
          vote: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't PUT comment vote, not logged in");
          done();
        });
    });
  });

  describe('/PUT invalid user vote with valid credentials', () => {
    it('should not put user vote and return code 400', (done) => {
      agent.put('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .set('Content-Type', 'application/json')
        .send({
          vote: 6,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(res.text, 'Error - Invalid Vote Value');
          done();
        });
    });
  });

  describe('/DELETE a user vote with valid credentials', () => {
    it('should delete user vote', (done) => {
      agent.delete('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/DELETE a user vote with invalid credentials', () => {
    it('should not delete user vote and return code 401', (done) => {
      chai.request(server)
        .delete('/api/comments/623d71eb0af2e4f21b42a701/voting/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't DELETE comment vote, not logged in");
          done();
        });
    });
  });
});
