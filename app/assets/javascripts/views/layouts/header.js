Airfnf.Views.Header = Backbone.View.extend({
  template: JST["layouts/header"],

  events: {
    'click #sign-out-link': 'signOut'
  },

  initialize: function () {
    this.listenTo(Airfnf.currentUser, "signIn signOut", this.render);
    this.render();
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
