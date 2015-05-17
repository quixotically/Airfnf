Airfnf.Views.ListingShow = Backbone.CompositeView.extend({
  tagName: 'ul',
  template: JST["listings/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  }
});
