Airfnf.Views.Home = Backbone.View.extend({
  template: JST["home"],

  initialize: function () {
    this.listenTo(Airfnf.currentUser, "sync", Airfnf._removeModalView);
  },

  events: {
    "click .search": "search",
    "keyup #search": "checkEnter"
  },

  search: function (event) {
    event.preventDefault();
    var location = $("#search").val();

    Backbone.history.navigate("listings/search_results/" + location,
      { trigger: true });
  },

  checkEnter: function(event){
    if(event.keyCode == 13){
      $(".search").click();
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
