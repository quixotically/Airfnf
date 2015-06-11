Airfnf.Views.ListingItem = Backbone.View.extend({
  tagName: 'li',
  className: 'listing-item',
  template: JST["listings/item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .item': 'viewListing'
  },

  viewListing: function (event) {
    event.preventDefault();
    Backbone.history.navigate("listings/" + this.model.id, { trigger: true });
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  }
});
