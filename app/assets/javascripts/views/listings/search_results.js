Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  events: {
    'slidechange .price-slider': 'udpatePrice',
    'change input:checkbox': 'udpateRoomType',
    'change .accommodates': 'udpateGuests',
    'mouseover .item': 'panToListing'
    // toggle on descr:hover, text-decoration: underline
    // 'mouseenter .listing': 'toggleBounce'
    // 'mouseleave .listing': 'toggleBounce'
  },

  initialize: function () {
    this.mapView = new Airfnf.Views.Map({
      collection: this.collection
    });

    this.addSubview('.filters', new Airfnf.Views.SearchFilters(), true);
    this.listenTo(this.collection, "add", this.addListingItemView);
    this.listenTo(this.collection, "remove", this.removeListingItemView);
    this.collection.each(this.addListingItemView.bind(this));
  },
  // flickers in Chrome 16
  // toggleBounce: function (event) {
  //   var listingId = $(event.currentTarget).data('listing-id');
  //   this.mapView.toggleBounce(listingId);
  // },


  panToListing: function (event) {
    var listingId = $(event.currentTarget).data('listing-id');
    var marker = this.mapView._markers[listingId];
    this.mapView._map.panTo(marker.getPosition());
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    //this.listingsIndex.remove();
  },

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

  addListingItemView: function (listing) {
    var view = new Airfnf.Views.ListingItem({
      model: listing
    });

    this.addSubview('.listings', view);
  },

  removeListingItemView: function (listing) {
    this.removeModelSubview('.listings', listing);
  },

  render: function () {
    var content = this.template({
      location: this.collection.location
    });
    this.$el.html(content);
    if (Airfnf.currentSearch.length === 0) {
      this.$(".listings").html("<p>No listings at this location</p>");
    }
    this.$('.map').html(this.mapView.$el);
    this.mapView.initMap();
    this.attachSubviews();
    return this;
  }
});
