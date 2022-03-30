const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

const agent = chai.request.agent(server);

let dbConnect;

describe('comment test', () => {
  // connect to to server
  before((done) => {
    server.on('app_started', () => {
      done();
    });
  });

  // Removes inserted documents
  after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('CommentEvents').deleteMany({
      user: 'johnnyman',
    }, (err) => {
      if (err) throw err;
      // connect.closeConnection();
      done();
    });
  });

  // get userId cookie',
  it('should get a userId cookie', async () => {
    const res = await agent.post('/api/login')
      .send({
        username: 'johnnyman',
        password: 'papadog',
      })
      .set('Content-Type', 'application/json');
    expect(res).to.have.cookie('userId');
  });

  // Test Case 1
  it('/GET comments for valid postId with comments', (done) => {
    agent.get('/api/comment/623ae6a310ebb643f5d9c26e')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 2
  it('/GET comments for valid postId with comments with limit 100', (done) => {
    agent.get('/api/comment/623ae6a310ebb643f5d9c26e/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.isBelow(res.body.length, 100, 'It should return <= 100 comment');
        done();
      });
  });

  // Test Case 3
  it('/GET comments for postId with incorrect postID', (done) => {
    agent.get('/api/comment/12345678abc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal(res.text, 'invalid postID : expected 12 bytes or 24 hex characters');
        done();
      });
  });

  // Test Case 4
  it('/GET comments for postId not a hex value', (done) => {
    agent.get('/api/comment/623ae6a3nothex43f5d9c26e')
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal(res.text, 'invalid postID : expected hex value');
        done();
      });
  });

  // Test Case 5
  it('Posts a comment with a valid session', (done) => {
    agent
      .post('/api/comment/623be831862ea136b669ae9e/add')
      .set('Content-Type', 'application/json')
      .send({
        text: 'testing for case 24',
        commentID: '123d71eb0af2e4f21b42a701',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 6
  it('Posts a comment with a valid session to an invalid postId', (done) => {
    agent
      .post('/api/comment/623be831862ea136b669a/add')
      .set('Content-Type', 'application/json')
      .send({
        text: 'testing for case 25',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  // Test Case 7
  it('Posts a valid comment with an invalid session', (done) => {
    chai.request.agent(server)
      .post('/api/comment/623be831862ea136b669ae9e/add')
      .set({ Cookie: 'NA' })
      .set('Content-Type', 'application/json')
      .send({
        text: 'testing for case 26',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  // Test Case 8
  it('PUT on a valid comment', (done) => {
    agent.put('/api/comment/update/623d71eb0af2e4f21b42a701')
      .set('ContentType', 'application/json')
      .send({
        text: 'testing for update comment',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 9
  it('PUT on an invalid comment', (done) => {
    agent.put('/api/comment/update/')

      .set('ContentType', 'application/json')
      .send({
        text: 'testing for update comment',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  // Test Case 10
  it('Delete a valid comment', (done) => {
    agent.post('/api/comment/delete/123d71eb0af2e4f21b42a701')
      .set('ContentType', 'application/json')
      .send({
        text: 'testing for delete comment',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 11
  it('Delete an invalid comment', (done) => {
    agent.post('/api/comment/delete/323d71eb0af2ess4f21b42a701')
      .set('ContentType', 'application/json')
      .send({
        text: 'testing for delete comment',
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});
