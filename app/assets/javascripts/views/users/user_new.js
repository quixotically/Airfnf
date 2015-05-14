Airfnf.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  // events: {
  //   'click input': 'submit'
  // },
  //
  // submit: function (event) {
  //   // event.preventDefault();
  //   // var attrs = this.$el.serializeJSON();
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
