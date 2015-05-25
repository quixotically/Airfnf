Airfnf.Views.Home = Backbone.View.extend({
  template: JST["home"],

  initialize: function () {
    this.listenTo(Airfnf.currentUser, "sync", Airfnf._removeModalView);
  },

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
