const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe('Logout tests', () => {
  // before((done) => {
  //   server.on('app_started', () => {
  //     done();
  //   });

  //   agent.post('/api/login')
  //     .send({
  //       username: 'johnnyman',
  //       password: 'papadog',
  //     })
  //     .set('Content-Type', 'application/json')
  //     .end((err, res) => {
  //       expect(res).to.have.cookie('userId');
  //       done();
  //     });
  // });

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

  describe('/POST Logout', () => {
    it('should logout and get code 200', (done) => {
      agent.post('/api/logout')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
