Airfnf.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/new"],

  events: {
    'submit form': 'book'
  },

  book: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON().request;
    var that = this;

    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("/users/" + that.model.escape("requestor_id"),
          { trigger: true });
      },

      error: function (request, resp) {
        var errors = resp.responseJSON;
        Airfnf._flashMessage(errors, "error");
      }
    });
  },

  render: function () {
    var content = this.template({ request: this.model });
    this.$el.html(content);
    return this;
  }
});
