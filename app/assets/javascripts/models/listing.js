Airfnf.Models.Listing = Backbone.Model.extend({
  urlRoot: '/api/listings',

  book: function (approved_request, denied_requests) {
    denied_requests.each(function (request) {
      request.set("status", "Denied");
    });
    // set after since is a part of the collection, could rewrite as if/else
    approved_request.set("status", "Approved");

    this.set("booked", true);
  },
  //
  // booked: function () {
  //   if (!this._booked) {
  //     this._booked = false;
  //   }
  //
  //   return this._booked;
  // },

  requests: function () {
    if (!this._requests) {
      this._requests = new Airfnf.Collections.Requests([], {
        //listing: this
        //requestor_or_listing: this
      });
    }

    return this._requests;
  },

  toJSON: function () {
    var json = { listing: _.clone(this.attributes) };

    if (this._pic) {
      json.listing.pic = this._pic;
    }

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
