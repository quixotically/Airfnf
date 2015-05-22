Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  // className: 'full-size',

  events: {
    'slidechange .price-slider': 'udpatePrice',
    'change input:checkbox': 'udpateRoomType',
    'change .accommodates': 'udpateGuests'
    // 'click a.listing-name': 'panToListing',
    // 'mouseenter .listing': 'startBounce',
    // 'mouseleave .listing': 'stopBounce'
  },

  initialize: function () {
    this.mapView = new Airfnf.Views.Map({
      collection: this.collection
    });

    this.addSubview('.filters', new Airfnf.Views.SearchFilters(), true);

    // this.listenTo(this.collection, "add", this.addListingView);
    // this.listenTo(this.collection, "remove", this.removeListingView);
    // this.collection.each(this.addListingView.bind(this));
    this.render();
  },

  // startBounce: function (event) {
  //   var listingId = $(event.currentTarget).children('a').data('listing-id');
  //   this.mapView.startBounce(listingId);
  // },
  //
  // stopBounce: function (event) {
  //   var listingId = $(event.currentTarget).children('a').data('listing-id');
  //   this.mapView.stopBounce(listingId);
  // },
  //
  // destroyListing: function (event) {
  //   var listingId = $(event.currentTarget).data('listing-id');
  //   var listing = this.collection.get(listingId);
  //   listing.destroy();
  // },
  //
  // panToListing: function (event) {
  //   var listingId = $(event.currentTarget).data('listing-id');
  //   var marker = this.mapView._markers[listingId];
  //   this.mapView._map.panTo(marker.getPosition());
  // },
  //
  // render: function () {
  //   // Because we set up the `mapView` here, we MUST NOT re-render this view.
  //   var content = this.template();
  //   this.$el.html(content);
  //   this.$('.sidebar').html(this.listingsIndex.render().$el);
  //   this.$('.map').html(this.mapView.$el);
  //   this.mapView.initMap();
  //   return this;
  // },
  //
  // remove: function () {
  //   Backbone.View.prototype.remove.call(this);
  //   this.mapView.remove();
  //   this.listingsIndex.remove();
  // }

  // event methods

  udpatePrice: function (event) {
    event.preventDefault();
    var values = this.$(".price-slider").slider("values");
    var newPriceProperty = { price: values }

    this.updateExistingFilters(newPriceProperty);
    this.filter();
  },

  udpateRoomType: function (event) {
    event.preventDefault();
    var roomTypes = this.$('input:checkbox:checked').map(function () { return $(this).val() });
    var newRoomTypeProperty = { room_type: roomTypes };

    this.updateExistingFilters(newRoomTypeProperty);
    this.filter();
  },

  udpateGuests: function (event) {
    event.preventDefault();
    var guests = this.$(".accommodates").val();
    var newGuestsProperty = { accommodates: guests };

    this.updateExistingFilters(newGuestsProperty);
    this.filter();
  },

  updateExistingFilters: function (property) {
    this.existingFilters = this.existingFilters || {
      price: this.$(".price-slider").slider("values"),
      room_type: ["Entire home/apt", "Private room", "Shared room"],
      accommodates: 1
    };

    this.existingFilters = $.extend({}, this.existingFilters, property);
  },

  // filter methods

  filter: function () {
    var newListings = Airfnf.currentSearch.filter(function (listing) {
      if (this.inPriceRange(listing) && this.inRoomTypes(listing) && this.inGuestRange(listing)) {
        return listing;
      }
    }.bind(this));

    this.collection.set(newListings);
  },

  inPriceRange: function (listing) {
    var max = this.$(".price-slider").slider("option", "max");

    if ((this.existingFilters.price[0] <= listing.get("price") &&
      this.existingFilters.price[1] >= listing.get("price")) ||
         (this.existingFilters.price[1] === max && listing.get("price") > max)) {
      return true;
    }

    return false;
  },

  inRoomTypes: function (listing) {
    return _.contains(this.existingFilters.room_type, listing.get("room_type"));
  },

  inGuestRange: function (listing) {
    return this.existingFilters.accommodates <= listing.get("accommodates");
  },

  // listing subview methods

  addListingView: function (listing) {
    var view = new Airfnf.Views.ListingShow({
      model: listing
    });

    this.addSubview('.listings', view);
  },

  removeListingView: function (listing) {
    this.removeModelSubview('.listings', listing);
  },

  render: function () {
    var content = this.template({
      location: this.collection.location
    });
    this.$el.html(content);
    this.$('.map').html(this.mapView.$el);
    this.attachSubviews();
    return this;
  }
});
