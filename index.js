if (!process.env.ENV) {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiV1 = require("./api/v1/routing");
app.use("/api/v1", apiV1);

// get hostname
let hostname;
if (process.env.VCAP_APPLICATION) {
  const vcap = JSON.parse(process.env.VCAP_APPLICATION);
  hostname = "http://" + vcap.application_uris[0];
} else {
  hostname = `http://localhost:${port}`;
}

// connect the DB
const dbUrl = process.env.DB_URL.replace("<PASS>", process.env.DB_PASS);
const dbName = process.env.DB_NAME;
console.log(`${dbUrl}${dbName}`);
mongoose
  .connect(`${dbUrl}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch(error => {
    console.log(`DB Fail to Connect: ${error}`);
  });
const db = mongoose.connection;
// check for error
db.on("error", err => {
  console.log(err);
});
// close the DB
process.on("SIGINT", () => {
  db.close();
  console.log("Mongoose connection closed through app termination");
  process.exit(0);
});

app.listen(port, function () {
  console.log("listening to " + hostname);
});

module.exports = app;
