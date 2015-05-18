Airfnf.Collections.Requests = Backbone.Collection.extend({
  url: "/api/requests",

  model: Airfnf.Models.Request,
  // correct initialization???
  initialize: function (models, options) {
    this.user = options.user;
    this.listing = options.listing;
  },

  getAndFetch: function (id) {
    var request = this.get(id);
    var that = this;

    if (request) {
      return request.fetch();
    } else {
      request = new Airfnf.Models.Request({ id: id });
      request.fetch({
        success: function () {
          that.add(request);
        }
      });
    }

    return request;
  }
});
