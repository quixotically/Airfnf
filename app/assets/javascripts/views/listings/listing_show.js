Airfnf.Views.ListingShow = Backbone.CompositeView.extend({
  tagName: 'ul',
  template: JST["listings/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.collection = this.model.requests();
    this.listenTo(this.collection, "add", this.addListingRequestView);
    this.collection.each(this.addListingRequestView.bind(this));
  },

  events: {
    'click .request-to-book': 'addRequestFormView',
    'click .delete': 'deleteListing'
    // 'click .view-listing': 'viewListing',
    // 'click .back': 'back'
  },

  // viewListing: function (event) {
  //   event.preventDefault();
  //   Backbone.history.navigate("listings/" + this.model.id, { trigger: true });
  // },
  //
  // back: function (event) {
  //   event.preventDefault();
  //   window.history.back();
  // },

  deleteListing: function (event) {
    event.preventDefault();

    this.model.destroy({
      success: function (listing, resp) {
        Backbone.history.navigate("/users/" + Airfnf.currentUser.id,
          { trigger: true });
      },
      error: function (listing, resp) {
        var errors = resp.responseJSON;
        Airfnf._flashMessage(errors, "error");
      }
    });
  },

  addRequestFormView: function (event) {
    event.preventDefault();
    var request = new Airfnf.Models.Request({
      listing_id: this.model.id
    });

    this.requestNewView = new Airfnf.Views.RequestNew({
      model: request
    });

    this.addSubview('.request-new', this.requestNewView);
  },

  addListingRequestView: function (request) {
    if (Airfnf.currentUser.id === this.model.get("owner_id")) {
      var requestView = new Airfnf.Views.RequestShow({
        model: request,
        // collection: requests for listing
        collection: this.collection
      });

      this.addSubview('.listing-requests', requestView);
    }
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
