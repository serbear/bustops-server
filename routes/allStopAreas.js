const express = require('express');
const {getAreaStops} = require("../data");
const router = express.Router();

router.get('/', async function (req, res, next) {
    const userResponse = await getAreaStops();
    res.send(userResponse);
});

module.exports = router;
