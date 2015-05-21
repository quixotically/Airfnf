Airfnf.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  events: {
    'submit form': 'submit',
    'change #avatar': 'fileInputChange'
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
        Backbone.history.navigate("", { trigger: true });
      },

      error: function () {
        alert("Form invalid. Let the user know what went wrong.");
      }
    })
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

  _updatePreview: function (src) {
    this.$el.find("#preview-avatar").attr("src", src);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
