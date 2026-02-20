// require("dotenv").config();
// const mongoose = require("mongoose");
// const Listing = require("../models/listing.js");
// const initData = require("./data.js");

// async function connect() {
//   await mongoose.connect(process.env.ATLASDB_URL);
//   console.log("✅ MongoDB Connected");
// }

// async function start() {
//   await connect();
// }

// start();

// const Owner_ID = "699823b5b97e6db019b7acff";

// async function initDB() {
//   await Listing.deleteMany({});

//   const updatedData = initData.data.map((obj) => ({
//     title: obj.title,
//     description: obj.description,
//     price: obj.price,
//     location: obj.location,
//     country: obj.country,
//     image: {
//       url: obj.image?.url || "",
//       filename: obj.image?.filename || "listingimage",
//     },
//     reviews: obj.reviews || [],
//     owner: Owner_ID,
//   }));
//   await Listing.insertMany(updatedData);
//   mongoose.connection.close();
// }
// initDB();
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const Owner_ID = "699823b5b97e6db019b7acff";

async function connect() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("✅ MongoDB Connected");
}

async function initDB() {
  await Listing.deleteMany({});

  const updatedData = initData.data.map((obj) => ({
    title: obj.title,
    description: obj.description,
    price: obj.price,
    location: obj.location,
    country: obj.country,
    image: {
      url: obj.image?.url || "",
      filename: obj.image?.filename || "listingimage",
    },
    reviews: obj.reviews || [],
    owner: Owner_ID,
  }));

  await Listing.insertMany(updatedData);
  console.log("✅ Database Initialized");

  mongoose.connection.close();
}

async function start() {
  await connect();
  await initDB();
}

start();
