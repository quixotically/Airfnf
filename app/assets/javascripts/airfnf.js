window.Airfnf = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    this.currentUser = new Airfnf.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new Airfnf.Views.Header({ el: "#header" });
    this.router = new Airfnf.Routers.Users({ $rootEl: $("#main") });

    new Airfnf.Routers.Router();
    Backbone.history.start();
  }
}
