Airfnf.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',

  toJSON: function () {
    var json = { listing: _.clone(this.attributes) };
    return json;
  }
})
