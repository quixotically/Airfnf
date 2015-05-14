Airfnf.Views.SessionNew = Backbone.View.extend({
  template: JST["sessions/new"],

  events: {
    'submit form': 'submit'
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
      error: function () {
        alert("Wrong username/password combination. Please try again.");
      }
    });
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
