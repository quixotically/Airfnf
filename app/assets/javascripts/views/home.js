Airfnf.Views.Home = Backbone.View.extend({
  template: JST["home"],

  events: {
    "click .search": "search"
  },

  search: function (event) {
    event.preventDefault();
    var location = $("input").val();

    Backbone.history.navigate("listings/search_results/" + location,
      { trigger: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
