Airfnf.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',

  book: function () {
    this._booked = true;
  },

  booked: function () {
    if (!this._booked) {
      this._booked = false;
    }

    return this._booked;
  },

  requests: function () {
    if (!this._requests) {
      this._requests = new Airfnf.Collections.Requests([], {
        // listing: this
        requestor_or_listing: this
      });
    }

    return this._requests;
  },

  toJSON: function () {
    var json = { listing: _.clone(this.attributes) };
    return json;
  },

  parse: function (resp) {
    if (resp.requests) {
      this.requests().set(resp.requests, { parse: true });
      delete resp.requests;
    }

    return resp;
  }
})
