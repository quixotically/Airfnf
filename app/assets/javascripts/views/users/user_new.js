Airfnf.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  events: {
    'submit form': 'submit',
    'change #avatar': 'fileInputChange',
    'click .modal-close': 'removeModalView',
    'click #sign-in-link': 'signIn'
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  submit: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;

    this.model.set(userData);
    this.model.save({}, {
      success: function () {
        Airfnf.currentUser.fetch();
        Airfnf._flashMessage("Successfully signed in as new user", "success");
        Backbone.history.navigate("", { trigger: true });
      },

      error: function (user, resp) {
        var errors = resp.responseJSON;
        Airfnf._flashMessage(errors, "error");
      }
    });
  },

  signIn: function (event) {
    event.preventDefault();
    var view = new Airfnf.Views.SessionNew({ callback: false });
    Airfnf._swapModalView(view);
  },

  fileInputChange: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      that._updatePreview(reader.result);
      that.model._avatar = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._avatar;
    }
  },

  removeModalView: function (event) {
    event.preventDefault();
    Airfnf._removeModalView();
  },

  _updatePreview: function (src) {
    this.$el.find("#preview-avatar").attr("src", src);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
