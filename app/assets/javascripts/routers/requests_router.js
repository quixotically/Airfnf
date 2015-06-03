Airfnf.Routers.RequestsRouter = Backbone.Router.extend({
  initialize: function () {
    this.$rootEl = $('main');
  },

  routes: {
    'requests/new': 'requestNew'
  },

  requestNew: function () {
    var callback = this.requestNew.bind(this);

    var request = new Airfnf.Models.Request();

    var view = new Airfnf.Views.RequestNew({
      model: request
    });

    this._swapView(view);
  }

  // requestShow: function (id) {
  //   var callback = this.requestShow.bind(this, id);
  //   if (!this._requireSignedIn(callback)) { return; }
  //
  //   var request = new Airfnf.Models.Request({ id: id });
  //   request.fetch();
  //
  //   var view = new Airfnf.Views.RequestShow({
  //     model: request,
  //     collection: ????
  //   });
  //
  //   this._swapView(view);
  // }
});
