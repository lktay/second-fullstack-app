"use strict";
//imports
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

//handler imports
const error404 = require("./handlers/404");
const error500 = require("./handlers/500");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", homeHandler);
app.get("/animelist", animeListHandler);
// app.delete("/animelist/delete/:id", animeDeleteHandler);
// app.put("/animelist/complete/:id", animeCompletedHandler)
app.get("*", error404);
// app.post("/search", addAnimeHandler);

app.use(error500);

mongoose.connect("mongodb://127.0.0.1:27017/animelist");

const animeSchema = new mongoose.Schema({
  title_english: String,
  title_japanese: String,
  imageUrl: String,
  aired: String,
  complete: { type: Boolean, default: false },
  timestamp: { type: String, default: Date.now() },
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

function homeHandler(req, res) {
  res.send("homepage");
}

async function animeListHandler(req, res) {
  let anime = await animeModel.find({});
  res.json(anime);
}
// async function addAnimeHandler(req, res) {
//   console.log(req.body);

//   const title_english = req.body.title_english;
//   const title_japanese = req.body.title_japanese;
//   const imageUrl = req.body.imageUrl;
//   const aired = req.body.aired;

//   let newAnime = await animeModel.create({
//     title_english,
//     title_japanese,
//     imageUrl,
//     aired,
//   });
// newAnime.save();
//   res.json(newAnime);
// }

async function animeDeleteHandler(req, res) {
  const result = await animeModel.findByIdAndDelete(req.params.id);

  res.json(result);
}

async function animeCompletedHandler(req, res) {
  const anime = animeModel.findById(req.params.id);
  anime.complete = !anime.complete;
  anime.save();
  res.json(anime);
}
app.use(error404);

app.listen(PORT, () => {
  console.log(`listening listening on ${PORT} :)`);
});
