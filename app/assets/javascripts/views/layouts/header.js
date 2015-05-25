Airfnf.Views.Header = Backbone.View.extend({
  template: JST["layouts/header"],

  events: {
    'click #sign-out-link': 'signOut',
    'click #sign-up-link': 'signUp',
    'click #sign-in-link': 'signIn'
  },

  initialize: function () {
    this.listenTo(Airfnf.currentUser, "signIn signOut", this.render);
    this.render();
  },

  signUp: function (event) {
    event.preventDefault();
    var user = new Airfnf.Models.User();
    var view = new Airfnf.Views.UserNew({
      model: user
    });
    Airfnf._swapModalView(view);
  },

  signIn: function (event) {
    event.preventDefault();
    var view = new Airfnf.Views.SessionNew({ callback: false });
    Airfnf._swapModalView(view);
  },

  signOut: function (event) {
    event.preventDefault();
    Airfnf.currentUser.signOut({
      success: function () {
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template({ currentUser: Airfnf.currentUser });
    this.$el.html(content);
    return this;
  }
});
