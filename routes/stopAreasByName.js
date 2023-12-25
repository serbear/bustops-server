const express = require('express');
const {getAreaStopsByName} = require("../data");const router = express.Router();

router.post('/', async function (req, res, next) {
    const userResponse = await getAreaStopsByName(req.body.name);
    res.send(userResponse);
});

module.exports = router;
