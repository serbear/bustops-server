const mariadb = require('mariadb');
const {db} = require("./config");

const pool = mariadb.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    connectionLimit: 5,
    connectTimeout: db.connectTimeout,
    multipleStatements: true,
});

async function getAllAreaStops() {
    let conn;
    let rows;

    try {
        conn = await pool.getConnection();
        rows = await conn.query("call GetAllStopAreas();");
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end();
        }
    }

    return rows[0];
}

async function getAreaStopByName(areaStopName) {
    let conn;
    let rows;

    try {
        conn = await pool.getConnection();
        rows = await conn.query("call GetStopAreaByNameLike(?);", [areaStopName]);
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end();
        }
    }

    return rows[0];
}

async function getAreaStopsByAreaName(areaStopName) {
    let conn;
    let rows;

    try {
        conn = await pool.getConnection();
        rows = await conn.query("call GetStopsOfArea(?);", [areaStopName]);
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.end();
        }
    }

    return rows[0];
}

module.exports = {
    getAreaStops: getAllAreaStops,
    getAreaStopsByName: getAreaStopByName,
    getAreaStopsByAreaName: getAreaStopsByAreaName
}
