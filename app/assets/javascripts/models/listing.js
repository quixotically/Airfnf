Airfnf.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',

  requests: function () {
    if (!this._requests) {
      this._requests = new Airfnf.Collections.Requests([], {
        owner_or_listing: this
      });
    }

    return this._requests;
  },

  toJSON: function () {
    var json = { listing: _.clone(this.attributes) };
    return json;
  },

  parse: function () {
    if (resp.requests) {
      this.requests().set(resp.requests, { parse: true });
      delete resp.requests;
    }

    return resp;
  }
})
