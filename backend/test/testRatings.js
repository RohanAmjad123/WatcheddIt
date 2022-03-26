const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect, assert} = require('chai');
chai.use(chaiHttp);

const server = require("../server");

let session_key

// Retrieve cookie
before((done) => {
    server.on("app_started", () => {
        chai.request(server)
            .post('/api/login')
            .send({
                "username": "johnnyman",
                "password": "papadog"
            })
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                session_key = res.header['set-cookie'].pop().split(';')[0]
                done()
            })
    })
})


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

describe('/GET user rating', function () {
    it('get user rating', function (done) {
        chai.request(server)
            .get('/api/media/tt5180504/ratings/user')
            .set({'Cookie': session_key})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
    })
})

describe('/DELETE user rating', function () {
    it('delete user rating', function (done) {
        chai.request(server)
            .delete('/api/media/tt5180504/ratings/user')
            .set('Content-Type', 'application/json')
            .set({'Cookie': session_key})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
    })
})

describe('/POST user rating', function () {
    it('post user rating', function (done) {
        chai.request(server)
            .post('/api/media/tt5180504/ratings/user')
            .set('Content-Type', 'application/json')
            .set({'Cookie': session_key})
            .send({
                "rating": 3
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
    })
})

describe('/PUT user rating', function () {
    it('put user rating', function (done) {
        chai.request(server)
            .put('/api/media/tt5180504/ratings/user')
            .set('Content-Type', 'application/json')
            .set({'Cookie': session_key})
            .send({
                "rating": 4
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done()
            })
    })
})