Airfnf.Views.ListingNew = Backbone.View.extend({
  template: JST["listings/new"],

  events: {
    'submit form': 'submit',
    'change #pic': 'fileInputChange',
    'click .fill': 'fillForm'
  },

  fillForm: function (event) {
    event.preventDefault();

    $("#shared").prop("checked", true);
    $(".accommodates").val(5);
    $("#address").val("598 Broadway New York, NY");
    $("#price").val(600);
    $("textarea").val("Best place!");
  },

  fileInputChange: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      that._updatePreview(reader.result);
      that.model._pic = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._pic;
    }
  },

  _updatePreview: function (src) {
    this.$el.find("#preview-pic").attr("src", src);
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

      error: function (listing, resp) {
        var errors = resp.responseJSON;
        Airfnf._flashMessage(errors, "error");
      }
    })
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    return this;
  }
});
