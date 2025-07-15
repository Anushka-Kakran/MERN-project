const express = require('express');
const app = express();
const port =  process.env.PORT || 5000;
const cors = require('cors');

//middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

// mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:ZPGfv0iSkX3gkSg6@cluster0.7yoxnjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const bookscollections = client.db("BookInvertory").collection("books");

    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookscollections.insertOne(data);
      res.send(result);
    });

    //get all books from the database
    app.get("/all-books", async(req,res) => {
  const books = bookscollections.find();
  const result = await books.toArray();
  res.send(result);
});

//update a book data : patch or update methods
   app.patch("/book/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const updateBookData = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert : true};

    const updateDoc = {
      $set : {
        ...updateBookData
       }
    }

    //update
    const result = await bookscollections.updateOne(filter, updateDoc, options);

    res.send(result);
      
   });

    // delete a book data
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
       const result = await bookscollections.deleteOne(filter);
       res.send(result);
      });

      // find by category 
      app.get("/all-books", async(req,res) => {
          let query = {};
          if (req.query?.category) {
             query = {category: req.query.category}

          }
          const result = await bookscollections.find(query).toArray();
          res.send(result);
      });

      // to get single book data
     app.get("/book/:id", async(req,res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await bookscollections.findOne(filter);
      res.send(result);


     });


    // Ping to test connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

}

run().catch(console.dir);




app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  
})