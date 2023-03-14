const express = require("express");
require("dotenv").config({path: './.env'});
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//import db sequalize
const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:500"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//configuration database sequalize
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur l application frandz." });
});

//route users
require("./app/routes/user-routes")(app)


// set port, listen for requests
const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});