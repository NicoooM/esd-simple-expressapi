const formatParamsReqId = (req) => {
  id = Number(req.params.id);
  return id;
};

module.exports = formatParamsReqId;
