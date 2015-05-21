Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  events: {
    'slidechange .price-slider': 'udpatePrice',
    'change input:checkbox': 'udpateRoomType',
    'change .accommodates': 'udpateGuests'
  },

  initialize: function () {
    this.addSubview('.filters', new Airfnf.Views.SearchFilters(), true);
    // add reset event to both listeners?
    this.listenTo(this.collection, "add", this.addListingView);
    this.listenTo(this.collection, "remove", this.removeListingView);
    //this.listenTo(this.collection, "reset", this.render);
    this.collection.each(this.addListingView.bind(this));
  },

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

  filter: function () {
    //debugger;
    var newListings = Airfnf.currentSearch.filter(function (listing) {
      if (this.inPriceRange(listing) && this.inRoomTypes(listing) && this.inGuestRange(listing)) {
        return listing;
      }
    }.bind(this));

    this.collection.set(newListings);
    //debugger;
  },

  inPriceRange: function (listing) {
    var max = this.$(".price-slider").slider("option", "max");

    if ((this.existingFilters.price[0] <= listing.escape("price") &&
      this.existingFilters.price[1] >= listing.escape("price")) ||
         (this.existingFilters.price[1] === max && listing.escape("price") > max)) {
      return true;
    }

    return false;
  },

  inRoomTypes: function (listing) {
    return _.contains(this.existingFilters.room_type, listing.escape("room_type"));
  },

  inGuestRange: function (listing) {
    return this.existingFilters.accommodates <= listing.get("accommodates");
  },

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
    console.log("Render!");
    var content = this.template({
      location: this.collection.location
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
