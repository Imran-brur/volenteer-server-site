const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qezpx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const registerCollection = client.db("volenteerLife").collection("peoples");

  app.get('/volenteerWork', (req, res) => {
    registerCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents);
    })
  })

  app.post('/addRegister', (req, res) => {
    const register = req.body;
    registerCollection.insertOne(register)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/volenteers', (req, res) =>{
    registerCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.delete('/delete/:id', (req, res) => {
    registerCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      res.send(result.deleteCount > 0);
    })
  })


});


app.listen(port)