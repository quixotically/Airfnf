Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  events: {
    'change .price': 'filterPrice',
    'change .room-type': 'filterRoomType',
    'change .guests': 'filterGuests'
  },

  initialize: function () {
    this.addSubview('.filters', new Airfnf.Views.SearchFilters(), true);
    // add reset event to both listeners?
    this.listenTo(this.collection, "add", this.addListingView);
    this.listenTo(this.collection, "remove", this.removeListingView);
    this.collection.each(this.addListingView.bind(this));
  },

  filterPrice: function (event) {
    event.preventDefault();
    this.collection = Airfnf.currentSearch.where({ price: $(event.currentTarget).val()});
  },

  filterRoomType: function (event) {
    event.preventDefault();
    this.collection = Airfnf.currentSearch.where({ roomType: $(event.currentTarget).val()});
  },

  filterGuests: function (event) {
    event.preventDefault();
    this.collection = Airfnf.currentSearch.where({ accommodates: $(event.currentTarget).val()});
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
    var content = this.template({
      location: this.collection.location
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
