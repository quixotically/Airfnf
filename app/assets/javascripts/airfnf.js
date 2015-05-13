window.Airfnf = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    new Airfnf.Routers.Router();
    Backbone.history.start();
  }
}
