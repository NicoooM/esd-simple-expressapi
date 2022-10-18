const express = require("express");
const app = express();

const artists = require("./db/artists");

app.use(express.json());

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
  const { name, type, description } = req.body;
  if (!name || !type || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const id = artists[artists.length - 1].id + 1;
  const newArtist = { id, name, type, description };
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
  const { name, type, description } = req.body;
  if (!name || !type || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  artist.name = name;
  artist.type = type;
  artist.description = description;
  res.status(200).json(artist);
});

app.patch("/artists/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const artist = artists.find((artist) => artist.id === id);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  const { name, type, description } = req.body;
  if (!name && !type && !description) {
    return res
      .status(400)
      .json({ error: "A name, a type or a description must be provided" });
  }
  name ? (artist.name = name) : null;
  type ? (artist.type = type) : null;
  description ? (artist.description = description) : null;
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
