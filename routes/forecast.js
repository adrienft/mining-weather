const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get("/favorite/:city", async (req, res) => {
    const city = req.params.city;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;

    try {
        const weatherResponse = await axios.get(weatherUrl);
        const forecastResponse = await axios.get(forecastUrl);

        // Filtrer les prévisions pour n'utiliser que les données de midi
        const filteredForecast = forecastResponse.data.list.filter(item => item.dt_txt.includes("12:00:00"));

        res.render("index", { weather: weatherResponse.data, forecast: filteredForecast, error: null, favorites: req.app.locals.favorites });
    } catch (error) {
        res.render("index", { weather: null, forecast: null, error: "Ville non trouvée !", favorites: req.app.locals.favorites });
    }
});

module.exports = router;
