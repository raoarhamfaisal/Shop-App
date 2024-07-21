// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test?retryWrites=true'
//   )
//     .then(client => {
//       console.log('Connected!');
//       callback(client);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://arhamfaisal780:Arham123.@cluster0.rzdbkky.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

let _db;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const mongoConnect = async (callback) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // store the database connection
    _db = client.db();
    callback();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.log(e, "error");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database connection Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

//app.js

// const mongoConnect = require("./util/database").mongoConnect;

// mongoConnect(() => {
//   app.listen(3000, () =>
//     console.log("Server is running on http://localhost:3000")
//   );
// }).catch((error) => console.error("Connection failed:", error));
