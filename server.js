require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// Importer les routes
const currentWeatherRouter = require('./routes/currentWeather');

app.use(currentWeatherRouter);

if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
}

module.exports = app;
