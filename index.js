const express =require ('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT  || 8000;


app.use(cors())
app.use(express.json())

// entice_brand
// eFOj9jp09IIABvdk


var uri = "mongodb://entice_brand:eFOj9jp09IIABvdk@ac-8pabrgd-shard-00-00.q1kedym.mongodb.net:27017,ac-8pabrgd-shard-00-01.q1kedym.mongodb.net:27017,ac-8pabrgd-shard-00-02.q1kedym.mongodb.net:27017/?ssl=true&replicaSet=atlas-uqgq0w-shard-0&authSource=admin&retryWrites=true&w=majority"

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const addPro = client.db('addproductDB').collection('addproducts')
    const Brands = client.db('addproductDB').collection('brands')


    app.get ('/addproducts' , async (req,res) => {
        const cursor = addPro.find()
        const result = await cursor.toArray()
        res.send(result) 
    })
 
    app.get('/brands', async(req,res) => {
        const cursor = Brands.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/brands/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await Brands.findOne(query)
      res.send(result);
    })

    app.post('/brands',async(req,res) =>{ 
        const addproduct = req.body;
        console.log(addproduct);
        const result = await addPro.insertOne(addproduct)
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('Hello From ENTICE')
});

app.listen(port,() => {
    console.log(`Entice server running on ${port}`);
})