const findDataById = (id, data) => {
  const found = data.find((item) => item.id === id);
  return found;
};

module.exports = findDataById;
