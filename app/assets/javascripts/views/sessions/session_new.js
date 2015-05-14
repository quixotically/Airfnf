Airfnf.Views.SessionNew = Backbone.View.extend({
  template: JST["sessions/new"],

  // events: {
  //   'click button': 'submit'
  // },
  //
  // submit: function (event) {
  //   event.preventDefault();
  // },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
