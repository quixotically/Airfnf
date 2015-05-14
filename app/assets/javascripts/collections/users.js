Airfnf.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Airfnf.Models.User,

  getAndFetch: function(id) {
    var user = this.get(id),
        users = this;

    if (user) {
      user.fetch();
    } else {
      user = new this.model({ id: id });
      user.fetch({
        success: function() {
          users.add(user);
        }
      });
    }

    return user;
  }
});
