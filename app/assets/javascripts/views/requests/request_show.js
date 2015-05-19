Airfnf.Views.RequestShow = Backbone.View.extend({
  template: JST["requests/show"],

  events: {
    'click .approve': 'approve'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  approve: function (event) {
    event.preventDefault();
    var requestId = $(event.currentTarget).attr("data-id");
    var url = "/api/requests/" + requestId + "/approve";

    $.ajax({
      url: url,
      method: "POST",
      dataType: "json",
      success: function () {
        // fetch collection/model data?
        // this.render();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ request: this.model });
    this.$el.html(content);
    return this;
  }
});
