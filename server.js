require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.favorites = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { weather: null, forecast: null, error: null, favorites: req.app.locals.favorites });
});

// Importer les routes
const currentWeatherRouter = require('./routes/currentWeather');
const forecastRouter = require('./routes/forecast');
const favoritesRouter = require('./routes/favorites');

app.use(currentWeatherRouter);
app.use(forecastRouter);
app.use(favoritesRouter);

if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
}

module.exports = app;
