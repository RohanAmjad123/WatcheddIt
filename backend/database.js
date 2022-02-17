const {MongoClient} = require("mongodb");

const connection = "mongodb+srv://user2:seng401@cluster0.pqb5x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                // return callback(err);
            }

            dbConnection = db.db("read");
            console.log("Successfully connected to MongoDB.");

            //   return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
};