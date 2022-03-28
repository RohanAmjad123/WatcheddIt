process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../server');
const connect = require('../database');

let dbConnect;

describe('Signup tests', () => {
  // before((done) => {
  //   server.on('app_started', () => {
  //     done();
  //   });

  //   connect.connect();
  //   done();
  // });

  // after(() => connect.closeConnection());

  // Test Case 04
  describe(('/POST Signup with valid credentials'), () => {
    it('should signup with valid details', (done) => {
      chai.request(server)
        .post('/api/signup/')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res).to.have.status(200);
          assert.equal(
            res.body.acknowledged,
            true,
            'The document should be inserted',
          );
          assert.exists(
            res.body.insertedId,
            'The document should have an inserted ID',
          );
          done();
        });
    });
  });

  // Test Case 05
  // SHOULD NOT BE TESTING DATABASE
  // describe(('Check password'), () => {
  //   it('should assert that the inserted users password is obfuscated', (done) => {
  //     dbConnect = connect.getDb();
  //     dbConnect.collection('users').findOne(
  //       {
  //         username: 'testuser',
  //       },
  //       (err, res) => {
  //         if (err) throw err;
  //         assert.notEqual(
  //           res.password,
  //           'testpassword',
  //           'The password should be obfuscated',
  //         );
  //       },
  //     );

  //     // Remove the newly created user from the database
  //     dbConnect.collection('users').deleteOne(
  //       {
  //         username: 'testuser',
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         done()
  //       },
  //     );
  //   });
  // });

  // Test Case 06
  describe(('/POST Signup with an already existing username'), () => {
    it('should fail and send code 409', (done) => {
      chai.request(server)
        .post('/api/signup/')
        .send({
          username: 'RohanAmjad123',
          password: 'testpassword',
        })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res).to.have.status(409);
          assert(
            res.text,
            'Failure trying to register an account',
            'The body message should display that it failed trying to register for an account',
          );
          done();
        });
    });
  });
});
