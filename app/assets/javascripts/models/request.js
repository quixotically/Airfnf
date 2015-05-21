Airfnf.Models.Request = Backbone.Model.extend({
  urlRoot: "/api/requests",
  // maybe dry this up - don't need entire models if just want to read single attr from parse
  owner: function () {
    if (!this._owner) {
      this._owner = new Airfnf.Models.User();
    }

    return this._owner;
  },

  requestor: function () {
    if (!this._requestor) {
      this._requestor = new Airfnf.Models.User();
    }

    return this._requestor;
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
    if (resp.owner) {
      this.owner().set(resp.owner, { parse: true });
      delete resp.owner;
    }

    if (resp.requestor) {
      this.requestor().set(resp.requestor, { parse: true });
      delete resp.requestor;
    }

    if (resp.listing) {
      this.listing().set(resp.listing, { parse: true });
      delete resp.listing;
    }

    return resp;
  }
});
