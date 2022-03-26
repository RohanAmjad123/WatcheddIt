const chai = require('chai');
let {expect, assert} = require('chai');
var jp = require('jsonpath');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000/api'
var session_key
const connect = require("../database.js")
var dbConnect

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
    console.log("Deleting...")
    dbConnect = connect.getDb()
    dbConnect.collection("PostEvents").deleteMany(
        {
            user: "johnnyman"
        }, function (err, result)
        {
            if (err) throw err;
            console.log(result)
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
    it('Retrieve posts', async function () {
        let res =  await chai.request(url)
        .get('/api/posts/')
        expect(res).to.have.status(200);   
    },
    // Test Case 11
    it('Retrieve a singular post', async function () {
        let res =  await chai.request(url)
    } )
)})