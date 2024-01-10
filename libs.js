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
    busCollection[bus].isEarlier = busCollection[bus].route_id === busId;
  }
}

function GetRouteFromCollection(busId, busCollection) {
  return busCollection.filter((record) => record.route_id === busId)[0];
}

module.exports = {
  GetStoredProcedureParamString: GetStoredProcedureParamString,
  CheckTime: CheckTime,
  SetNearestBusFlag: SetNearestBusFlag,
  GetRouteFromCollection: GetRouteFromCollection,
};
