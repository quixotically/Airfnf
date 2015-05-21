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

    if (!Airfnf.currentSearch || Airfnf.currentSearch.location !== query) {
      $.ajax({
        url: "/api/listings/search?location=" + query,
        method: "GET",
        dataType: "json",
        success: function (data) {
          Airfnf.currentSearch = new Airfnf.Collections.Listings(data,
            { location: query });
          var search = new Airfnf.Collections.Listings(data,
            { location: query });
          var resultsView = new Airfnf.Views.SearchResults({
            collection: search
          });

          this._swapView(resultsView);
        }.bind(this)
      });
    } else {
      //debugger;
      var search = new Airfnf.Collections.Listings(Airfnf.currentSearch.clone(),
        { location: query });
      var resultsView = new Airfnf.Views.SearchResults({
        collection: search
      });

      this._swapView(resultsView);
    }
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
