Airfnf.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/new"],

  events: {
    'submit form': 'submit'
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON().request;
    var that = this;

    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("/requests/" + that.model.id,
          { trigger: true });
      },

      error: function () {
        alert("Form invalid. Let the user know what went wrong.");
      }
    });
  },

  render: function () {
    var content = this.template({ request: this.model });
    this.$el.html(content);
    return this;
  }
});
