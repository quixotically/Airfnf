Airfnf.Models.Request = Backbone.Model.extend({
  urlRoot: "/api/requests",

  // listing: function () {
  //   return Airfnf.Models.Listing.get(this.listing_id);
  // },

  toJSON: function () {
    var json = { request: _.clone(this.attributes) };
    return json;
  }
});
