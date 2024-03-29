const mariadb = require("mariadb");
const { db } = require("./config");
const {
  GetStoredProcedureParamString,
  SetNearestBusFlag,
  GetRouteFromCollection,
  UpdateNearestTime,
} = require("./libs");
const { MARIADB_USERNAME, MARIADB_PASSWORD, MARIADB_PORT, MARIADB_DB } =
  process.env;
const pool = mariadb.createPool({
  host: db.host,
  user: MARIADB_USERNAME,
  password: MARIADB_PASSWORD,
  port: MARIADB_PORT,
  database: MARIADB_DB,
  connectionLimit: 5,
  connectTimeout: db.connectTimeout,
  multipleStatements: true,
});

let shortestTime = null;
let nearestTimeBusId = null;

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

async function GetAllAreaStops() {
  return await CallStoredProcedure("GetAllStopAreas", null);
}

async function GetAreaStopByName(areaStopName) {
  return await CallStoredProcedure("GetStopAreaByNameLike", [areaStopName]);
}

async function GetAreaStopsByAreaName(areaStopName) {
  return await CallStoredProcedure("GetStopsOfArea", [areaStopName]);
}
async function GetNearestRegionAndStop(lat, lon) {
  return await CallStoredProcedure("NearestRegionAndStop", [lat, lon]);
}
async function GetBusesForStopInArea(stop_id) {
  let fullCollection = await CallStoredProcedure("GetBusesForStopInArea", [
    stop_id,
  ]);

  /*
  Rebuilding the collection.
  Arrival time is collected in an array.
  */

  let distinctCollection = [];

  for (const xKey in fullCollection) {
    const currentBus = fullCollection[xKey];
    // noinspection JSUnresolvedReference
    const filteredBus = GetRouteFromCollection(
      currentBus.route_id,
      distinctCollection,
    );
    let x = null;

    if (filteredBus === undefined) {
      // add a new buss in the distinct collection.

      const newBus = currentBus;
      newBus.arrival_time = [currentBus.arrival_time];
      distinctCollection.push(newBus);

      x = UpdateNearestTime(shortestTime, newBus);
    } else {
      // add a new arrival time to an existing bus

      // noinspection JSUnresolvedReference
      let b = GetRouteFromCollection(filteredBus.route_id, distinctCollection);

      if (b.arrival_time.length < 5) {
        b.arrival_time.push(currentBus.arrival_time);
        x = UpdateNearestTime(shortestTime, currentBus);
      } else {
        continue;
      }
    }

    nearestTimeBusId =
      x.nearestTimeBusId === null ? nearestTimeBusId : x.nearestTimeBusId;
    shortestTime = x.shortestTime;
  }

  SetNearestBusFlag(nearestTimeBusId, distinctCollection);

  return distinctCollection;
}

async function GetStopDescription(stopName, areaName) {
  return await CallStoredProcedure("GetStopDescription", [stopName, areaName]);
}

module.exports = {
  GetAreaStops: GetAllAreaStops,
  GetAreaStopsByName: GetAreaStopByName,
  GetAreaStopsByAreaName: GetAreaStopsByAreaName,
  GetBusesForStopInArea: GetBusesForStopInArea,
  GetStopDescription: GetStopDescription,
  GetNearestRegionAndStop: GetNearestRegionAndStop,
};
