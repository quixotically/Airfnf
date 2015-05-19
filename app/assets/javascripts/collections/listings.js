Airfnf.Collections.Listings = Backbone.Collection.extend({
  // nested url?
  url: "/api/listings",
  model: Airfnf.Models.Listing,

  initialize: function (models, options) {
    this.owner = options.owner;
  },
  // needed?
  getAndFetch: function (id) {
    var listing = this.get(id);
    var that = this;

    if (listing) {
      listing.fetch();
    } else {
      listing = new Airfnf.Models.Listing({ id: id });
      listing.fetch({
        success: function () {
          that.add(listing);
        }
      });
    }

    return listing;
  }
});
