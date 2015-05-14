Airfnf.Views.Header = Backbone.View.extend({
  template: JST["layouts/header"],

  events: {
    'click button': 'signOut'
  },

  signOut: function () {
    
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
