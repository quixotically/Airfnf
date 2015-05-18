Airfnf.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  listings: function () {
    if (!this._listings) {
      this._listings = new Airfnf.Collections.Listings([], { user: this });
    }

    return this._listings;
  },

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  parse: function (resp) {
    if (resp.listings) {
      this.listings().set(resp.listings, { parse: true });
      delete resp.listings;
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
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  }
});
