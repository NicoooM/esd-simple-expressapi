const express = require("express");

const { artists } = require("./controllers/artists.controller");

const router = express.Router();

router.get("/artists", artists.getAllArtists);

module.exports = router;
