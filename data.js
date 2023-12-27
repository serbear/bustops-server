const mariadb = require("mariadb");
const { db } = require("./config");
const { GetStoredProcedureParamString } = require("./libs");

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

async function CallStoredProcedure(name, params) {
  let rows;
  let conn;

  try {
    conn = await pool.getConnection();

    if (params === null) {
      rows = await conn.query(`call ${name};`);
    } else {
      const paramString = GetStoredProcedureParamString(params);
      rows = await conn.query(`call ${name}(${paramString});`, params);
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.end();
    }
  }

  return rows[0];
}

async function getAllAreaStops() {
  return await CallStoredProcedure("GetAllStopAreas", null);
}

async function getAreaStopByName(areaStopName) {
  return await CallStoredProcedure("GetStopAreaByNameLike", [areaStopName]);
}

async function getAreaStopsByAreaName(areaStopName) {
  return await CallStoredProcedure("GetStopsOfArea", [areaStopName]);
}

async function GetBusesForStopInArea(regionName, stopName) {
  return await CallStoredProcedure("GetBusesForStopInArea", [
    stopName,
    regionName,
  ]);
}

module.exports = {
  getAreaStops: getAllAreaStops,
  getAreaStopsByName: getAreaStopByName,
  getAreaStopsByAreaName: getAreaStopsByAreaName,
  GetBusesForStopInArea: GetBusesForStopInArea,
};
