window.Airfnf = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    this.currentUser = new Airfnf.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new Airfnf.Views.Header({ el: "#header" });
    new Airfnf.Routers.Router();

    Backbone.history.start();
  }
}
