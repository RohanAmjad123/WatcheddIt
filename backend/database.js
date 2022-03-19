const {MongoClient} = require("mongodb");

const connection = "mongodb+srv://WatchedditApp:SENG401@watchedditcluster.j2xln.mongodb.net/Watcheddit?retryWrites=true&w=majority";
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
            dbConnect = db.db("Watcheddit");
            console.log("Successfully connected to Watcheddit MongoDB.");
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
        return dbConnect;
    },

    // getWriteDb: function () {
    //     return dbWrite;
    // }

};
