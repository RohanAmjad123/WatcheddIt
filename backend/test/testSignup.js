process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect, assert } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../server');
const connect = require('../database');

let dbConnect;
dbConnect = connect.getDb();

describe('Signup tests', () => {
  // before((done) => {
  //   server.on('app_started', () => {
  //     done();
  //   });

  //   connect.connect();
  //   done();
  // });
  // Remove the newly created user from the database
  after(() => dbConnect.collection('users')
    .deleteOne(
      {
        username: 'testuser',
      },
      (err) => {
        if (err) throw err;
      },
    ));

  // Test Case 04
  describe(('/POST Signup with valid credentials'), () => {
    it('should signup with valid details', async () => {
      const res = await chai.request(server)
        .post('/api/signup/')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .set('Content-Type', 'application/json');
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
    });
  });

  // Test Case 05
  describe(('Check password'), () => {
    it('should assert that the inserted users password is obfuscated', () => {
      dbConnect = connect.getDb();
      dbConnect.collection('users').findOne(
        {
          username: 'testuser',
        },
        (err, res) => {
          if (err) throw err;
          assert.notEqual(
            res.password,
            'testpassword',
            'The password should be obfuscated',
          );
        },
      );
    });
  });

  // Test Case 06
  describe(('/POST Signup with an already existing username'), () => {
    it('should fail and send code 409', () => {
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
        });
    });
  });
});
