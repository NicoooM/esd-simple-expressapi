const express = require("express");
const app = express();

const artists = require("./db/artists");
const categories = require("./db/categories");
const records = require("./db/records");

app.use(express.json());

// artists

app.get("/artists", (req, res) => {
  res.status(200).json(artists);
});

app.get("/artists/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const artist = artists.find((artist) => artist.id === id);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  res.status(200).json(artist);
});

app.post("/artists", (req, res) => {
  const { name, description } = req.body;
  let { categoryId, recordIds } = req.body;
  if (!name || !categoryId || !description || !recordIds) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const id = artists[artists.length - 1].id + 1;
  let category;
  categoryId = Number(categoryId);
  if (!categoryId) {
    return res.status(400).json({ error: "Invalid categoryId" });
  }
  category = categories.find((category) => category.id === categoryId);
  if (!category) {
    return res.status(400).json({ error: "Category not found" });
  }
  const _links = { records: [] };
  if (!recordIds) {
    return res.status(400).json({ error: "" });
  }
  recordIds = recordIds.map((record) => Number(record));
  recordIds.forEach((recordId) => {
    _links.records.push({ href: `http://localhost:3000/records/${recordId}` });
  });
  const newArtist = { id, name, category, _links, description };
  artists.push(newArtist);
  res.status(201).json(newArtist);
});

app.put("/artists/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const artist = artists.find((artist) => artist.id === id);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  const { name, description } = req.body;
  let { categoryId, recordIds } = req.body;
  if (!name || !description || !categoryId || !recordIds) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  categoryId = Number(categoryId);
  let category;
  if (categoryId) {
    category = categories.find((category) => category.id === categoryId);
  } else {
    return res.status(400).json({ error: "Invalid categoryId" });
  }
  const _links = { records: [] };
  recordIds = recordIds.map((record) => Number(record));
  recordIds.forEach((recordId) => {
    _links.records.push({ href: `http://localhost:3000/records/${recordId}` });
  });
  artist.name = name;
  artist.category = category;
  artist._links = _links;
  artist.description = description;
  res.status(200).json(artist);
});

app.delete("/artists/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const artist = artists.find((artist) => artist.id === id);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  const index = artists.indexOf(artist);
  artists.splice(index, 1);
  res.status(204).json();
});

// categories

app.get("/categories", (req, res) => {
  res.status(200).json(categories);
});

app.get("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const category = categories.find((category) => category.id === id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

app.post("/categories", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const id = categories[categories.length - 1].id + 1;
  const newCategory = { id, title, description };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const category = categories.find((category) => category.id === id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  category.title = title;
  category.description = description;
  res.status(200).json(category);
});

app.delete("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const category = categories.find((category) => category.id === id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  const index = categories.indexOf(category);
  categories.splice(index, 1);
  res.status(204).json();
});

// records

app.get("/records", (req, res) => {
  res.status(200).json(records);
});

app.get("/records/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const record = records.find((record) => record.id === id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  res.status(200).json(record);
});

app.post("/records", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const id = record[record.length - 1].id + 1;
  const newRecord = { id, name, description };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

app.put("/records/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const record = records.find((record) => record.id === id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  record.name = name;
  res.status(200).json(record);
});

app.delete("/records/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const record = records.find((record) => record.id === id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  const index = records.indexOf(record);
  records.splice(index, 1);
  res.status(204).json();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
