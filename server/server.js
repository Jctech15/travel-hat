const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const connectionString =
  "mongodb+srv://travelhatadmin:Cb3pzzURXnVilBPh@cluster0.kcoyv.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  const db = client.db("travel-locations");
  const locationsCollection = db.collection("locations");

  app.post("/locations", (request, response) => {
    console.log("BODY :D", request.body);
    locationsCollection
      .insertOne(request.body)
      .then((result) => {
        response.send(result);
      })
      .catch((error) => console.error(error));
  });

  app.get("/", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    response.send("<h1>Hello World!</h1>");
  });

  app.get("/all/locations", async (request, response) => {
    const data = await locationsCollection.find().toArray();
    response.send(data);
  });

  app.delete("/locations/:id", async (request, response) => {
    const deleteRequest = await locationsCollection.deleteOne({
      id: request.params.id,
    });
    const resp = {
      status: 200,
    };
    if (deleteRequest.deletedCount === 0) {
      resp.status = 500;
    }
    response.send(resp);
  });
  // app.get("/:id/locations", async (req, res) => {
  //   const data = await locationsCollection.findOne({
  //     id: Number(req.params.id),
  //   });

  //   res.send(data);
  // });
});
app.use(bodyParser.json());
app.use(cors(corsOptions));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
