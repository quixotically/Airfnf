Airfnf.Views.RequestShow = Backbone.View.extend({
  template: JST["requests/show"],

  events: {
    'click .approve': 'approve'
  },

  initialize: function () {
    this.listenTo(this.collection.owner_or_listing, "sync", this.render);
  },

  approve: function (event) {
    event.preventDefault();
    var url = "/api/requests/" + this.model.id + "/approve";

    $.ajax({
      url: url,
      method: "POST",
      dataType: "json",
      success: function () {
        // is a listing, so we can book it
        this.collection.owner_or_listing.book();
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({
      request: this.model,
      listing: this.collection.owner_or_listing
    });
    this.$el.html(content);
    return this;
  }
});
