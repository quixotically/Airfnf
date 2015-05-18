Airfnf.Models.Request = Backbone.Model.extend({
  urlRoot: "/api/requests",

  toJSON: function () {
    var json = { request: _.clone(this.attributes) };
    return json;
  }
});
