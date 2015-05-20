Airfnf.Views.SearchFilters = Backbone.View.extend({
  tagName: "ul",

  template: JST["layouts/search_filters"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
