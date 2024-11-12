const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://test:qqnbfy2guuzfBZkb@cluster0.chmi97k.mongodb.net/devTinder";

async function connectToDB() {
  await mongoose.connect(dbUrl);
}

module.exports = connectToDB;
