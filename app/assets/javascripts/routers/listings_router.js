Airfnf.Routers.ListingsRouter = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#main");
  },

  routes: {
    'listings': 'listingsIndex',
    'listings/new': 'listingNew',
    'listings/:id': 'listingShow',
    'listings/search_results/:query': 'searchResults'
  },

  searchResults: function (query) {
    var callback = this.searchResults.bind(this, query);
    if (!this._requireSignedIn(callback)) { return; }

    $.ajax({
      url: "/api/listings/search?location=" + query,
      method: "GET",
      dataType: "json",
      success: function (data) {
        var resultsView = new Airfnf.Views.SearchResults({
          //debugger;
          collection: new Airfnf.Collections.Listings(data,
          { location: query })
        });

        this._swapView(resultsView);
      }.bind(this)
    });
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
