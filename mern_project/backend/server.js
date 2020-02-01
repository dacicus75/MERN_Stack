const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//   const uri = "mongodb+srv://newuser:newuser@cluster0-l3xux.gcp.mongodb.net/test?retryWrites=true&w=majority";


//   const client = new MongoClient(uri);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await  listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// main().catch(console.error);



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://newuser:newuser@cluster0-l3xux.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices")
//   // perform actions on the collection object
//   .then(db => console.log("DB connected"))
//   .catch(err => console.log(error))
//    client.close();
// });



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});