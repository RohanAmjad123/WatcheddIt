const {MongoClient} = require("mongodb");

const connection = "mongodb+srv://user2:seng401@cluster0.pqb5x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbRead;
let dbWrite;

module.exports = {
    connectToRead: function () {
        client.connect(function (err, db) {
            if (err || !db) {
                console.log(err)
                return
            }
            dbRead = db.db("read");
            console.log("Successfully connected to MongoDB.");
        });
    },

    connectToWrite: function () {
        client.connect(function (err, db) {
            if (err || !db) {
                console.log(err)
                return
            }
            dbWrite = db.db("read");
            console.log("Successfully connected to MongoDB.");
        });
    },

    getReadDb: function () {
        return dbRead;
    },

    getWriteDb: function () {
        return dbWrite;
    }

};