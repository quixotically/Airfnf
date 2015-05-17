Airfnf.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function () {
    this.collection = this.model.listings();
    this.listenTo(this.model, "sync change", this.render);
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
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
