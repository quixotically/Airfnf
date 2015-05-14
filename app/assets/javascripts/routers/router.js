Airfnf.Routers.Router = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#main");
    this.listings = new Airfnf.Collections.Listings();
    this.listings.fetch();
  },

  routes: {
    '': 'home',
    'listings': 'listingsIndex',
    'listings/new': 'listingNew',
    'listings/:id': 'listingShow',
    'users/new': 'userNew',
    'users/:id': 'userShow',
    'session/new': 'sessionNew'
  },

  home: function () {
    var callback = this.home.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._swapView(new Airfnf.Views.Home());
  },

  // listings routes

  listingsIndex: function () {
    var view = Airfnf.Views.ListingsIndex({
      collection: this.listings
    });

    this._swapView(view);
  },

  listingNew: function () {
    var listing = new Airfnf.Models.Listing();

    var view = new Airfnf.Views.ListingNew({
      model: listing,
      collection: this.listings
    });

    this._swapView(view);
  },

  listingShow: function (id) {
    var listing = this.listings.getAndFetch(id);

    var view = new Airfnf.Views.ListingShow({
      model: listing
    });

    this._swapView(view);
  },

  // user and session routes

  userNew: function () {
    if (!this._requireSignedOut()) { return; }

    var user = new Airfnf.Models.User();

    var view = new Airfnf.Views.UserNew({
      model: user,
      collection: this.users
    });

    this._swapView(view);
  },

  userShow: function (id) {
    var callback = this.userShow.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var user = new Airfnf.Models.User({ id: id });
    user.fetch();

    var view = new Airfnf.Views.UserShow({
      model: user
    });

    this._swapView(view);
  },

  sessionNew: function (callback) {
    if (!this._requireSignedOut(callback)) { return; }

    var view = new Airfnf.Views.SessionNew({
      callback: callback
    });

    this._swapView(view);
  },

  // helpers

  _requireSignedIn: function (callback) {
    if (!Airfnf.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.sessionNew(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function (callback) {
    if (Airfnf.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function () {
    Backbone.history.navigate('', { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
