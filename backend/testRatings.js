const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect, assert } = require('chai');

chai.use(chaiHttp);

const server = require('../server');

let session_key;

describe('Ratings Tests', () => {
  // Retrieve cookie
  before((done) => {
    server.on('app_started', () => {
      chai.request(server)
        .post('/api/login')
        .send({
          username: 'johnnyman',
          password: 'papadog',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          session_key = res.header['set-cookie'].pop().split(';')[0];
          done();
        });
    });
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

  describe('/GET avg rating', () => {
    it('get avg rating', (done) => {
      chai.request(server)
        .get('/api/media/tt5180504/ratings')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('get avg rating with invalid imdbID', (done) => {
      chai.request(server)
        .get('/api/media/DoesNotExist/ratings')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal([]);
          done();
        });
    });
  });

  describe('/GET user rating', () => {
    it('get user rating', (done) => {
      chai.request(server)
        .get('/api/media/tt5180504/ratings/user')
        .set({ Cookie: session_key })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('get user rating without valid credentials', (done) => {
      chai.request(server)
        .get('/api/media/tt5180504/ratings/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't GET rating, not logged in");
          done();
        });
    });
  });

  describe('/DELETE user rating', () => {
    it('delete user rating', (done) => {
      chai.request(server)
        .delete('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .set({ Cookie: session_key })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('delete user rating without valid credentials', (done) => {
      chai.request(server)
        .delete('/api/media/tt5180504/ratings/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't DELETE rating, not logged in");
          done();
        });
    });
  });

  describe('/POST user rating', () => {
    it('post user rating', (done) => {
      chai.request(server)
        .post('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .set({ Cookie: session_key })
        .send({
          rating: 3,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('post user rating without valid credentials', (done) => {
      chai.request(server)
        .post('/api/media/tt5180504/ratings/user')
        .send({
          rating: 3,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't POST rating, not logged in");
          done();
        });
    });
    it('post user rating - invalid input', (done) => {
      chai.request(server)
        .post('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .set({ Cookie: session_key })
        .send({
          rating: 6,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(res.text, 'Error - Invalid Rating Value');
          done();
        });
    });
  });

  describe('/PUT user rating', () => {
    it('put user rating', (done) => {
      chai.request(server)
        .put('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .set({ Cookie: session_key })
        .send({
          rating: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('put user rating without valid credentials', (done) => {
      chai.request(server)
        .put('/api/media/tt5180504/ratings/user')
        .send({
          rating: 4,
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't PUT rating, not logged in");
          done();
        });
    });
    it('put user rating - invalid input', (done) => {
      chai.request(server)
        .put('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .set({ Cookie: session_key })
        .send({
          rating: 6,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(res.text, 'Error - Invalid Rating Value');
          done();
        });
    });
  });
});
