const checkId = (id, res) => {
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
};
