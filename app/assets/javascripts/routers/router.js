Airfnf.Routers.Router = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#content");
    this.listings = new Airfnf.Collections.Listings();
  },

  routes: {
    '': 'home',
    'listings': 'listingsIndex',
    'listings/new': 'listingNew',
    'listings/:id': 'listingShow'
  },

  home: function () {
    this._swapView(new Airfnf.Views.Home())
  },

  listingsIndex: function () {
    this.listings.fetch();

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

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
