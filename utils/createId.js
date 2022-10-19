const createId = (data) => {
  const id = data[data.length - 1].id + 1;
  return id;
};

module.exports = createId;
