const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'
var session_key
const connect = require("../database.js")
var dbConnect
var documentId

// Retrieves the cookie
before(async() => {
    let res = await chai.request(url)
    .post('/login/')
    .send({
      "username": "johnnyman",
      "password": "papadog"
    })
    .set('Content-Type', 'application/json')
    var responseCookies = res.headers['set-cookie'].pop().split(';')[0];
    session_key = responseCookies
    await connect.connect();
})

// Removes inserted documents
after(function(done) {
    dbConnect = connect.getDb()
    dbConnect.collection("PostEvents").deleteMany(
        {
            user: "johnnyman"
        }, function (err, result)
        {
            if (err) throw err;
            connect.closeConnection();
            done();
        }
    )
})


describe('/POST posts', function () {
    // Test Case 08
    it('A post with a valid session & data',  async function () {
    let res =  await chai.request(url)
    .post('/post/add')
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
    })
    it('A post with an invalid session & valid data', async function () {
        // Test Case 09
        let res =  await chai.request(url)
        .post('/post/add')
        .set('Content-Type', 'application/json')
        .set({'Cookie': ""})
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
        expect(res).to.have.status(401);
        assert.equal(res.text, "Can't POST post, not logged in", "The response body does not match")
    })
})

describe('/GET posts', function () {
    // Test Case 10
    it('Retrieve all posts', async function () {
        let res =  await chai.request(url)
        .get('/posts/')
        expect(res).to.have.status(200);   
    },
    // Test Case 11
    it('Retrieve a singular valid post', async function () {
        let res =  await chai.request(url)
        .get('/media/tt0816692/post/623aef7010ebb643f5d9c272')
        expect(res).to.have.status(200);
        expect(res.text).to.not.equal(null)
    } ),
    // Test Case 12
    it('Retrieve a singular invalid post with invalid IMDB id and valid postID', async function () {
        let res =  await chai.request(url)
        .get('/media/abc/post/623aef7010ebb643f5d9c272')
        expect(res).to.not.have.status(200);
        expect(res.body).to.be.empty;
    } ),

    // Test Case 13
    it('Retrieve a singular invalid post with valid IMDB id and invalid postID', async function () {
        let res =  await chai.request(url)
        .get('/media/tt0816692/post/abc')
        expect(res).to.not.have.status(200);
        expect(res.body).to.be.empty;
    } )    
    
)})

describe('/PUT posts', function () {
    // Test Case 14
    it('Edit a valid post', async function () {
      let res = await chai.request(url)
      .put("/post/update/623aef7010ebb643f5d9c272")
      .set('Content-Type', 'application/json')
      .set({'Cookie': session_key})
      .send({
        "data": {
            "title": "The ending was insane!",
            "description": "The ending of the movie was such a plot twist!",
            "user": "RohanAmjad123",
            "imdbID": "tt0816692",
            "votes": {
                "upvotes": 0,
                "downvotes": 0
            }
        },
        "user": "RohanAmjad123",
    
    })
    expect(res).to.have.status(200)

})})
    