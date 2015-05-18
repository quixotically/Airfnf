Airfnf.Collections.Listings = Backbone.Collection.extend({
  // fix this url
  url: "/api/users/:user_id/listings",
  model: Airfnf.Models.Listing,

  initialize: function (models, options) {
    this.user = options.user;
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
