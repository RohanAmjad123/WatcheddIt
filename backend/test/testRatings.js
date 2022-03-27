const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect, assert } = require('chai');

chai.use(chaiHttp);

const server = require('../server');

const agent = chai.request.agent(server);

describe('Ratings Tests', () => {
  // Retrieve cookie
  // before((done) => {
  //   server.on('app_started', () => {
  //     agent.post('/api/login')
  //       .send({
  //         username: 'johnnyman',
  //         password: 'papadog',
  //       })
  //       .set('Content-Type', 'application/json')
  //       .end((err, res) => {
  //         expect(res).to.have.cookie('userId');
  //         done();
  //       });
  //   });
  // });

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

  describe('/GET valid avg rating', () => {
    it('should get avg rating', (done) => {
      chai.request(server)
        .get('/api/media/tt5180504/ratings')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/GET avg rating of invalid imdbID', () => {
    it('should get nothing', (done) => {
      chai.request(server)
        .get('/api/media/DoesNotExist/ratings')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal([]);
          done();
        });
    });
  });

  describe('/GET a users rating for a media with valid credentials', () => {
    it('should get the users rating', (done) => {
      agent.get('/api/media/tt5180504/ratings/user')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/GET a users rating for a media with invalid credentials', () => {
    it('should not return a rating and return code 401', (done) => {
      chai.request(server)
        .get('/api/media/tt5180504/ratings/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't GET rating, not logged in");
          done();
        });
    });
  });

  describe('/POST a user rating with valid credentials', () => {
    it('should post a user rating', (done) => {
      agent.post('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .send({
          rating: 3,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/POST a user rating with invalid credentials', () => {
    it('should not post a user rating and return code 401', (done) => {
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
  });

  describe('/POST an invalid user rating', () => {
    it('should not post a user rating and return code 401', (done) => {
      agent.post('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
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

  describe('/PUT a user rating with valid credentials', () => {
    it('put user rating', (done) => {
      agent.put('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .send({
          rating: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/PUT a user rating with invalid credentials', () => {
    it('should not put auser rating and return code 401 ', (done) => {
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
  });

  describe('/PUT invalid user rating with valid credentials', () => {
    it('should not put user rating and return code 400', (done) => {
      agent.put('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
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

  describe('/DELETE a user rating with valid credentials', () => {
    it('should delete user rating', (done) => {
      agent.delete('/api/media/tt5180504/ratings/user')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('/DELETE a user rating with invalid credentials', () => {
    it('should not delete user rating and return code 401', (done) => {
      chai.request(server)
        .delete('/api/media/tt5180504/ratings/user')
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal(res.text, "Can't DELETE rating, not logged in");
          done();
        });
    });
  });
});
