const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
// const connectDb = require("./config/dbConnection");
const { MongoClient } = require("mongodb");

const UrlDB =
  "mongodb+srv://admin:admin@atlascluster.tzy77pk.mongodb.net/myBills";
const client = new MongoClient(UrlDB);

app.listen(port, () => {
  console.log(`bills Service is running at http://localhost:${port}`);
  //   connectDb();
});
client
  .connect()
  .then(() => {
    console.log("connected to bills service Db a mongoDB Server");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/all", async (req, res) => {
  const collection = client.db().collection("users");
  try {
    const equipes = await collection.find({}).toArray();
    res.json(equipes);
  } catch (error) {
    res.json(error);
  }
});
app.post("/user", (req, res) => {
  const newuser = req.body;
  const collection = client.db().collection("users");
  try {
    collection
      .insertOne(newuser)
      .then((resultat) => {
        res.json(resultat);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
});
app.put("/user/:id", (req, res) => {
  const id = req.body.id;
  const updateuser = req.body;
  const collection = client.db().collection("users");

  try {
    collection
      .replaceOne({ id: id }, updateuser)
      .then((resultat) => {
        res.json(resultat);
      })
      .catch((err) => {
        res.json("error"+err);
      });
  } catch (error) {
    res.json("error"+error);
  }
});

app.delete("/user/:id", (req, res) => {
  const userid = req.params;
  const collection = client.db().collection("users");
  try {
    collection
      .deleteOne(userid)
      .then((resultat) => {
        res.json(resultat);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
});
