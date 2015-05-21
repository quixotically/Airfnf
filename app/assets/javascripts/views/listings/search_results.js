Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  events: {
    'slidechange .price-slider': 'udpatePrice',
    'change input:checkbox': 'udpateRoomType',
    'change .accommodates': 'udpateGuests'
  },

  initialize: function () {
    this.initializeGeocoder(this.collection.location);
    this.addSubview('.filters', new Airfnf.Views.SearchFilters(), true);

    this.listenTo(this.collection, "add", this.addListingView);
    this.listenTo(this.collection, "remove", this.removeListingView);
    this.collection.each(this.addListingView.bind(this));
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

  addListingView: function (listing) {
    var view = new Airfnf.Views.ListingShow({
      model: listing
    });

    this.addSubview('.listings', view);
  },

  removeListingView: function (listing) {
    this.removeModelSubview('.listings', listing);
  },

  // Geocoder methods

  // initializeGeocoder: function (location) {
  //   geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(-34.397, 150.644);
  //   var mapOptions = {
  //     zoom: 8,
  //     center: latlng
  //   }
  //   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  // },
  // 
  // <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>

  render: function () {
    var content = this.template({
      location: this.collection.location
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
