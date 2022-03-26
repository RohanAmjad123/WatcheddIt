const {MongoClient} = require("mongodb");

const connection = "mongodb+srv://WatchedditApp:SENG401@watchedditcluster.j2xln.mongodb.net/Watcheddit?retryWrites=true&w=majority";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConnect;
// let dbWrite;

module.exports = {
    connect: async function ( callback ) {
        console.log("Connecting....")

        await client.connect();
        dbConnect = client.db("Watcheddit")
        console.log("connected to Watcheddit")
    },

    isDbConnected: function() {
        return client.isConnected();
    },

    closeConnection: function () {
        client.close();
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
