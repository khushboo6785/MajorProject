const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview)
);
//Review Delete
router.delete(
  "/:reviewId",
  isLoggedIn,
  asyncWrap(reviewController.destroyReview)
);
module.exports = router;
