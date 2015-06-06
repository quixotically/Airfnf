Airfnf.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/new"],

  events: {
    'submit form': 'book',
    'click .hide': 'hide'
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
        Airfnf._flashMessage("Cannot book a listing multiple times", "error");
      }
    });
  },

  hide: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template({ request: this.model });
    this.$el.html(content);
    return this;
  }
});
