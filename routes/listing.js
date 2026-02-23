const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Review = require("../models/review.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index route
router
  .route("/")
  .get(asyncWrap(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    asyncWrap(listingController.createListing),
  );

//New route
router.get("/new", isLoggedIn, listingController.renderNewListing);
//RenderCountry
router.get("/get/:country", listingController.renderCountry);

router
  .route("/:id")
  .get(asyncWrap(listingController.showListing))
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    asyncWrap(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.renderEditListing),
);
module.exports = router;
