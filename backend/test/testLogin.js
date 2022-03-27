process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../server');

describe('Login tests', () => {
  // before((done) => {
  //   server.on('app_started', () => {
  //     done();
  //   });
  // });

  describe('/POST Login with valid credentials', () => {
    it('should get a valid userId cookie', (done) => {
      chai.request(server)
        .post('/api/login/')
        .send({
          username: 'johnnyman',
          password: 'papadog',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.a.cookie('userId');
          assert.equal(
            res.body.username,
            'johnnyman',
            'The entered username should be the same',
          );
          assert.notEqual(
            res.body.password,
            'papadog',
            'The password should be hashed',
          );
          assert.equal(
            res.body.type,
            'user',
            'The user should be a regular user',
          );
          done();
        });
    });
  });

  describe('/POST Login with correct username and incorrect password', () => {
    it('should not get a userId cookie', (done) => {
      chai.request(server)
        .post('/api/login/')
        .send({
          username: 'johnnyman',
          password: 'wrongpassword',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.not.have.a.cookie('userId');
          assert.equal(
            res.text,
            'Wrong password',
            'The response body should indicate that the password is incorrect',
          );
          done();
        });
    });
  });

  describe('/POST Login with a username that does not exist', () => {
    it('should not get a userId cookie', (done) => {
      chai.request(server)
        .post('/api/login/')
        .send({
          username: 'asjdfiasjsafiasfj',
          password: 'wrongpassword',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.not.have.a.cookie('userId');
          assert.equal(
            res.text,
            'No matching username found',
            'The response body should indicate a matching username does not exist',
          );
          done();
        });
    });
  });
});
