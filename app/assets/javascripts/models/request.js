Airfnf.Models.Request = Backbone.Model.extend({
  urlRoot: "/api/requests",

  owner: function () {
    if (!this._owner) {
      this._owner = new Airfnf.Models.User();
    }

    return this._owner;
  },

  listing: function () {
    if (!this._listing) {
      this._listing = new Airfnf.Models.Listing();
    }

    return this._listing;
  },

  toJSON: function () {
    var json = { request: _.clone(this.attributes) };
    return json;
  },

  parse: function (resp) {
    if (resp.listing) {
      this.listing().set(resp.listing, { parse: true });
      delete resp.listing;
    }

    if (resp.owner) {
      this.owner().set(resp.owner, { parse: true });
      delete resp.owner;
    }

    return resp;
  }
});
