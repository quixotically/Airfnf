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
    // 'submit form': 'book'
  },

  addListingRequestView: function (request) {
    var requestView = new Airfnf.Views.RequestShow({
      model: request,
      // collection: requests for listing
      //need: listing and owner
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
    // var that = this;  ???
    this.addSubview('.request-new', this.requestNewView);
  },

  // book: function (event) {
  //   event.preventDefault();
  //   var attrs = $(event.currentTarget).serializeJSON().request;
  //   var that = this;
  //
  //   this.model.set(attrs);
  //   this.model.set({ listing_id: this.model.id });
  //   this.model.save({}, {
  //     success: function () {
  //       this.removeSubview('.request-new', this.requestNewView);
  //       $('.request-to-book').prop('disabled', true);
  //       $('.request-to-book').html("Requested");
  //     }.bind(this)
  //   });
  // },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
