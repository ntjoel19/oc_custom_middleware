const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const sessionsRoutes = require("./routes/sessions");
const userRoutes = require("./routes/user");
const path = require("path");
const dotenv = require("dotenv");


dotenv.config();
mongoose.connect("mongodb+srv://"  + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.mt0gvkn.mongodb.net?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sessions", sessionsRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;