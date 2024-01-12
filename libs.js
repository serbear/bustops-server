function GetStoredProcedureParamString(params) {
  let x = "?, ";
  x = x.repeat(params.length);
  return x.slice(0, -2);
}

function CheckTime(currentNearestTime, busTime) {
  let time = busTime.split(":");
  time = time[0] * 60 + Number(time[1]);

  if (currentNearestTime === null || currentNearestTime >= time) {
    return time;
  }
  return null;
}

function SetNearestBusFlag(busId, busCollection) {
  for (const bus in busCollection) {
    // noinspection JSUnresolvedReference
    busCollection[bus].isEarlier = busCollection[bus].route_id === busId;
  }
}

function GetRouteFromCollection(busId, busCollection) {
  // noinspection JSUnresolvedReference
  return busCollection.filter((record) => record.route_id === busId)[0];
}

function UpdateNearestTime(shortestTime, bus) {
  const nearestTime = Array.isArray(bus.arrival_time)
    ? CheckTime(shortestTime, bus.arrival_time[0])
    : CheckTime(shortestTime, bus.arrival_time);

  const returnObj = {};

  if (nearestTime !== null) {
    // noinspection JSUnresolvedReference
    returnObj.nearestTimeBusId = bus.route_id;
    returnObj.shortestTime = nearestTime;
  } else {
    returnObj.nearestTimeBusId = null;
    returnObj.shortestTime = shortestTime;
  }

  return returnObj;
}

module.exports = {
  GetStoredProcedureParamString: GetStoredProcedureParamString,
  SetNearestBusFlag: SetNearestBusFlag,
  GetRouteFromCollection: GetRouteFromCollection,
  UpdateNearestTime: UpdateNearestTime,
};
