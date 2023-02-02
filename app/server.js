// 1
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3
const db = require("./models");
db.sequelize.sync() // force: true, for drop existing tables and re-sync database
    .then(() => {
        console.log("Synced db.");
    });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to hari application." });
});

// 6
require("./routes/article.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});