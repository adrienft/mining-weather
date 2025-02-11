const express = require('express');
const router = express.Router();

router.post("/favorite", (req, res) => {
    const city = req.body.city;
    if (!req.app.locals.favorites.includes(city)) {
        req.app.locals.favorites.push(city);
    }
    res.redirect("/");
});

module.exports = router;
