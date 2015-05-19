Airfnf.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.collection = this.model.listings();
    this.listenTo(this.collection, "add", this.addListingView);
    this.listenTo(this.collection, "remove", this.removeListingView);
    this.collection.each(this.addListingView.bind(this));

    this.requests = this.model.requests();
    this.listenTo(this.requests, "add", this.addRequestView);
    this.requests.each(this.addRequestView.bind(this));
  },

  events: {
    'click .delete': 'deleteListing'
  },

  deleteListing: function (event) {
    event.preventDefault();
    var listing = this.collection.get($(event.currentTarget).attr("data-id"));
    listing.destroy();
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

  addRequestView: function (request) {
    var view = new Airfnf.Views.RequestShow({
      model: request,
      collection: this.requests
    });

    this.addSubview('.requests', view);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
