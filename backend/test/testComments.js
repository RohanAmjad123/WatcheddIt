const chai = require('chai');
const {expect, assert} = require('chai');
const { ObjectId } = require('mongodb');
let jp = require('jsonpath');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api';
let session_key;
const connect = require('../database.js')

let dbConnect;
let documentId;

// creates session with a cookie
// and gets it
before(async () => {
    let res = await chai.request(url)
      .post('/login/')
      .send({
        username: 'johnnyman',
        password: 'papadog'
      })
      .set('Content-Type', 'application/json');
    var responseCookies = res.headers['set-cookie'].pop().split(';')[0];
    session_key = responseCookies;
    await connect.connect();
  });
  
  // Removes inserted documents
  after((done) => {
    dbConnect = connect.getDb();
    dbConnect.collection('Comments').deleteMany({
        user: 'johnnyman'
      }, (err, result) => {
        if (err) throw err;
        connect.closeConnection();
        done();
      });
  });
  
  describe('/GET comments', () => {
    // Test Case 22
    it('A comment with a valid session & data', async () => {
      const res =  await chai.request(url)
      .get('/comment/623ae6a310ebb643f5d9c26e')
      .set('Content-Type', 'application/json')
      .set({'Cookie': session_key})
      .send(
          {
              "title": "test",
              "description": "test",
              "user": "johnnyman",
              "imdbID": "tt5180504",
              "votes": {
                  "upvotes": 0,
                  "downvotes": 0
              }
          }
          )
      expect(res).to.have.status(200);
    });
    it('A post with an invalid session & valid data', async () => {
      // Test Case 09
      let res = await chai.request(url)
        .post('/post/add')
        .set('Content-Type', 'application/json')
        .set({ 'Cookie': ''})
        .send(
          {
            "title": 'test',
            "description": 'test',
            "user": 'johnnyman',
            "imdbID": 'tt5180504',
            "votes": {
              "upvotes": 0,
              "downvotes": 0,
                  }
          }
        );
      expect(res).to.have.status(401);
      assert.equal(res.text, "Can't POST post, not logged in", 'The response body does not match');
    });
  });