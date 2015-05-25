window.Airfnf = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (current_user_id) {
    this.currentUser = new Airfnf.Models.CurrentUser({ id:
      current_user_id });
    this.currentUser.fetch();

    this.header = new Airfnf.Views.Header({ el: "#header" });

    new Airfnf.Routers.UsersRouter();
    new Airfnf.Routers.ListingsRouter();
    new Airfnf.Routers.RequestsRouter();

    Backbone.history.start();
  }
}
