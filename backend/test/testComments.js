const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const connect = require('../database');

const server = require('../server');

const agent = chai.request.agent(server);

let dbConnect;

// connecto to server
before((done) => {
  server.on('app_started', () => {
    done();
  });
});


describe('comment test', () => {
  // Retrieve cookie
  before((done) => {
    server.on('app_started', () => {
      done();
    });
  });

  // create session
  before((done) => {
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
    dbConnect.collection('CommentEvents').deleteMany({
      user: 'johnnyman',
    }, (err) => {
      if (err) throw err;
      // connect.closeConnection();
      done();
    });
  });

  // Test Case 22
  it('/GET comments for valid postId with comments', (done) => {
    agent.get('/api/comment/623ae6a310ebb643f5d9c26e')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 23
  it('/GET comments for postId with incorrect length', (done) => {
    agent.get('/api/comment/12345678abc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal(res.text, 'invalid postID : expected 12 bytes or 24 hex characters');
        done();
      });
  });

  // Test Case 23
  it('/GET comments for postId not a hex value', (done) => {
    agent.get('/api/comment/623ae6a3nothex43f5d9c26e')
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal(res.text, 'invalid postID : expected hex value');
        done();
      });
  });

  // Test Case 23
  // tested together because they are an equivalence class
  // if this fails, check if somehow a media got added with this id
  it('/GET comments for no comments in post or post doe not exist', (done) => {
    agent.get('/api/comment/523aef7010ebb643f5d9c272')
      .end((err, res) => {
        expect(res).to.have.status(404);
        assert.equal(res.text, 'post either does not exist or has no comments');
        done();
      });
  });

  // Test Case 24
  it('Posts a comment with a valid session', (done) => {
    agent
      .post('/api/comment/623be831862ea136b669ae9e/add')
      .set('Content-Type', 'application/json')
      .send({
        text: 'testing for case 24',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case 25
  it('Posts acomment with a valid session to an invalid postId', (done) => {
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

  // Test Case 26 Cant get it to work rn
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

  it('PUT on an invalid comment', (done) => {
    agent.put('/api/comment/update/')

    .set('ContentType', 'application/json')
    .send({
      "text": "testing for update comment"
    })
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

