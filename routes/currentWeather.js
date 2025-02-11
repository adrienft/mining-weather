const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post("/", async (req, res) => {
    const city = req.body.city;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;

    try {
        const weatherResponse = await axios.get(weatherUrl);
        res.render("index", { weather: weatherResponse.data, error: null });
    } catch (error) {
        res.render("index", { weather: null, error: "Ville non trouvée !" });
    }
});

module.exports = router;
