Airfnf.Views.SessionNew = Backbone.View.extend({
  template: JST["sessions/new"],

  events: {
    'submit form': 'submit',
    'click .modal-close': 'removeModalView',
    'click #sign-up-link': 'signUp'
  },

  initialize: function (options) {
    this.callback = options.callback;
    this.listenTo(Airfnf.currentUser, "signIn", this.signInCallback);
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    Airfnf.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function () {
        Airfnf._removeModalView();
      },
      error: function () {
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signUp: function (event) {
    event.preventDefault();
    var user = new Airfnf.Models.User();
    var view = new Airfnf.Views.UserNew({
      model: user
    });
    Airfnf._swapModalView(view);
  },

  removeModalView: function (event) {
    event.preventDefault();
    Airfnf._removeModalView();
  },

  signInCallback: function (event) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
