Airfnf.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  events: {
    'submit form': 'submit'
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  submit: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
      success: function () {
        Airfnf.currentUser.fetch();
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      },

      error: function () {
        alert("Form invalid. Let the user know what went wrong.");
      }
    })
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
