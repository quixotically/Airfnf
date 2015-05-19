Airfnf.Views.ListingShow = Backbone.CompositeView.extend({
  tagName: 'ul',
  template: JST["listings/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .request-to-book': 'addRequestFormView'
    'submit form': 'book'
  },

  addRequestFormView: function (event) {
    event.preventDefault();
    this.requestNewView = new Airfnf.Views.RequestNew({
      listing_id: this.model.id
    });
    // var that = this;  ???
    this.addSubview('.request-new', this.requestNewView);
  },

  book: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON().request;
    var that = this;

    this.model.set(attrs);
    this.model.set({ listing_id: $(event.currentTarget).attr("data-listing-id") });
    this.model.save({}, {
      success: function () {
        this.removeSubview('.request-new', this.requestNewView);
        $('.request-to-book').prop('disabled', true);
        $('.request-to-book').html("Requested");
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ listing: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
