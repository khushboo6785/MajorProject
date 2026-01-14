const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => {
    console.log(err);
  });

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "6957fcbcb0a046dc265d6a98",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("Data initalized");
// };
const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    image: {
      filename: "listingimage",
      url: obj.image, // original URL from your data file
    },
    owner: "6957fcbcb0a046dc265d6a98",
  }));

  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};

initDB();
