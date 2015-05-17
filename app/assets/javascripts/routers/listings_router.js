Airfnf.Routers.ListingsRouter = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#main");
  },

  routes: {
    'listings': 'listingsIndex',
    'listings/new': 'listingNew',
    'listings/:id': 'listingShow'
  },

  listingsIndex: function () {
    var view = Airfnf.Views.ListingsIndex({
      collection: this.listings
    });

    this._swapView(view);
  },

  listingNew: function () {
    var callback = this.listingNew.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var listing = new Airfnf.Models.Listing();

    var view = new Airfnf.Views.ListingNew({
      model: listing
    });

    this._swapView(view);
  },

  listingShow: function (id) {
    var callback = this.listingShow.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var listing = new Airfnf.Models.Listing({ id: id });
    listing.fetch();

    var view = new Airfnf.Views.ListingShow({
      model: listing
    });

    this._swapView(view);
  }
})
