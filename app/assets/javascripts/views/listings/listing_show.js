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
    'click .request-to-book': 'addRequestFormView'
  },

  addListingRequestView: function (request) {
    var requestView = new Airfnf.Views.RequestShow({
      model: request,
      // collection: requests for listing
      collection: this.collection
    });

    this.addSubview('.listing-requests', requestView);
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

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
