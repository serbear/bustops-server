const express = require('express');
const {getAreaStopsByAreaName} = require("../data");const router = express.Router();

router.post('/', async function (req, res, next) {
    const userResponse = await getAreaStopsByAreaName(req.body.name);
    res.send(userResponse);
});

module.exports = router;
