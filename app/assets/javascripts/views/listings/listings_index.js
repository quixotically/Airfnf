Airfnf.Views.ListingsIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  render: function () {
    var content = this.template({ listings: this.collection });
    this.$el.html(content);
    return this;
  }
});
