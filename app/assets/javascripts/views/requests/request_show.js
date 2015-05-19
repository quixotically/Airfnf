Airfnf.Views.RequestShow = Backbone.View.extend({
  template: JST["requests/show"],

  events: {
    'click .approve': 'approve'
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    //this.listenTo(this.model.owner(), "sync change", this.render);
    //this.listenTo(this.model.listing(), "sync change", this.render);
    this.listenTo(this.collection, "sync", this.render);
    //this.listenTo(this.collection.requestor_or_listing, "sync", this.render);
  },

  approve: function (event) {
    event.preventDefault();
    var url = "/api/requests/" + this.model.id + "/approve";

    $.ajax({
      url: url,
      method: "POST",
      dataType: "json",
      success: function () {
        this.model.listing().book(this.model, this.collection);
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({
      request: this.model,
      owner: this.model.owner(),
      listing: this.model.listing()
    });
    this.$el.html(content);
    return this;
  }
});
