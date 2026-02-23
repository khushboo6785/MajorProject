const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  const countries = await Listing.distinct("country");
  res.render("./listings/index.ejs", { allListings, countries });
};

module.exports.renderNewListing = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing Created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  console.log(listing);

  if (!listing) {
    req.flash("error", "listing you are requested for does not exists");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.renderEditListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you are requested for does not exists");
    return res.redirect("/listings");
  }
  let originalUrl = listing.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/w_250/");

  res.render("./listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let updatedlisting = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedlisting.image = { url, filename };
    await updatedlisting.save();
  }
  req.flash("success", "listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing Deleted!");
  res.redirect("/listings");
};
module.exports.renderCountry = async (req, res) => {
  let { country } = req.params;
  const allListings = await Listing.find({ country: country });
  res.json({ allListings });
  // res.render("./listings/index.ejs", { allListings, countries });
};
