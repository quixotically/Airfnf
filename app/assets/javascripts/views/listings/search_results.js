Airfnf.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["listings/search_results"],

  initialize: function () {
    this.listenTo(this.collection, "add", this.addListingView);
    this.collection.each(this.addListingView.bind(this));
  },

  addListingView: function (listing) {
    var view = new Airfnf.Views.ListingShow({
      model: listing
    });

    this.addSubview('.listings', view);
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
