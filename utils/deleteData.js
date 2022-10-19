const deleteData = (allData, dataToDelete) => {
  const index = allData.indexOf(dataToDelete);
  allData.splice(index, 1);
};

module.exports = deleteData;
