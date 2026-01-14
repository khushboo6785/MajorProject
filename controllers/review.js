const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  listing.reviews.push(newReview);
  await newReview.save();
  listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log(Review);

  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "You are not authorised to delete this review");
    return res.redirect(`/listings/${id}`);
  }
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
