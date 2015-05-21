Airfnf.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  listings: function () {
    if (!this._listings) {
      this._listings = new Airfnf.Collections.Listings([], {
        owner: this
      });
    }

    return this._listings;
  },

  requests: function () {
    if (!this._requests) {
      this._requests = new Airfnf.Collections.Requests([], {
        // requestor: this
        //requestor_or_listing: this
      });
    }

    return this._requests;
  },

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  },

  parse: function (resp) {
    if (resp.listings) {
      this.listings().set(resp.listings, { parse: true });
      delete resp.listings;
    }

    if (resp.requests) {
      this.requests().set(resp.requests, { parse: true });
      delete resp.requests;
    }

    return resp;
  }
});

Airfnf.Models.CurrentUser = Airfnf.Models.User.extend({
  url: "/api/session",

  initialize: function (options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function (options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function (data) {
        model.set(data);
        options.success && options.success();
      },
      error: function () {
        options.error && options.error();
      }
    });
  },

  signOut: function (options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function () {
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  }
});
