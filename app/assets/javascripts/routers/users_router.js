Airfnf.Routers.UsersRouter = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#main");
  },

  routes: {
    '': 'home',
    'users/:id': 'userShow',
    'session/new': 'sessionNew'
  },

  home: function () {
    var callback = this.home.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._swapView(new Airfnf.Views.Home());
  },

  userShow: function (id) {
    var callback = this.userShow.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var user = new Airfnf.Models.User({ id: id });
    user.fetch();

    var view = new Airfnf.Views.UserShow({
      model: user
    });

    this._swapView(view);
  }
})
