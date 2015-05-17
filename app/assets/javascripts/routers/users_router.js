Airfnf.Routers.UsersRouter = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $("#main");
  },

  routes: {
    '': 'home',
    'users/new': 'userNew',
    'users/:id': 'userShow',
    'session/new': 'sessionNew'
  },

  home: function () {
    var callback = this.home.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._swapView(new Airfnf.Views.Home());
  },

  userNew: function () {
    if (!this._requireSignedOut()) { return; }

    var user = new Airfnf.Models.User();

    var view = new Airfnf.Views.UserNew({
      model: user
    });

    this._swapView(view);
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
