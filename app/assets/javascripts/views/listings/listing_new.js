Airfnf.Views.ListingNew = Backbone.View.extend({
  template: JST["listings/new"],

  events: {
    'submit form': 'submit',
    'click .fill': 'fillForm'
  },

  fillForm: function (event) {
    event.preventDefault();

    $("#shared").prop("checked", true);
    $(".accommodates").val(5);
    $("#location").val("New York");
    $("#price").val(600);
    $("textarea").val("Best place!");
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
