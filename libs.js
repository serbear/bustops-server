function GetStoredProcedureParamString(params) {
  let x = "?, ";
  x = x.repeat(params.length);
  return x.slice(0, -2);
}

module.exports = {
  GetStoredProcedureParamString: GetStoredProcedureParamString,
};
