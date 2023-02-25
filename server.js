"use strict";
//imports
const app = express();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
// app.use(express.json());
app.use(animeListHandler());

app.get("/", homepageHandler);
app.get("/animelist", animeListHandler);
// app.get("/addanime", searchAnimeHandler);
// app.post("/addanime", addAnimeHandler);

mongoose.connect("mongodb://127.0.0.1:27017/animelist");

const animeSchema = new mongoose.Schema({
  title_english: String,
  title_japanese: String,
  imageUrl: String,
  aired: String,
});

const animeModel = mongoose.model("anime", animeSchema);

// function populateAnimeCollection() {
//   const test = new animeModel({
//     title_english: "Testito",
//     title_japanese: "テスト",
//     imageUrl: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
//     aired: "Oct 3, 2020 to Mar 27, 2021",
//   });
//   test.save();
// }
// populateAnimeCollection();

app.listen(PORT, () => {
  console.log(`listening listening on ${PORT} :)`);
});
