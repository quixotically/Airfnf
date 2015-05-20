Airfnf.Views.ListingNew = Backbone.View.extend({
  template: JST["listings/new"],

  events: {
    'submit form': 'submit'
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().listing;
    var that = this;

    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("/listings/" + that.model.id,
          { trigger: true });
      },

      error: function () {
        alert("Form invalid. Let the user know what went wrong.");
      }
    })
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  }
});
