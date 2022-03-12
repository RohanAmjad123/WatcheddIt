const {MongoClient} = require("mongodb");

const connection = "mongodb+srv://user2:seng401@cluster0.pqb5x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConnect;
// let dbWrite;

module.exports = {
    connect: function () {
        client.connect(function (err, db) {
            if (err || !db) {
                console.log(err)
                return
            }
            dbConnect = db.db("read");
            console.log("Successfully connected to read MongoDB.");
        });
    },

    // connectToWrite: function () {
    //     client.connect(function (err, db) {
    //         if (err || !db) {
    //             console.log(err)
    //             return
    //         }
    //         dbConnect = db.db("write");
    //         console.log("Successfully connected to write MongoDB.");
    //     });
    // },

    getDb: function () {
        return dbRead;
    },

    // getWriteDb: function () {
    //     return dbWrite;
    // }

};