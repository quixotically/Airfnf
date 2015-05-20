Airfnf.Views.SearchFilters = Backbone.View.extend({
  template: JST["layouts/search_filters"],

  initialize: function () {
    this.render();
  },

  // filter: function (event) {
  //
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
