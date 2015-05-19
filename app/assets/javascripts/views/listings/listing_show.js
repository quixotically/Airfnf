Airfnf.Views.ListingShow = Backbone.CompositeView.extend({
  tagName: 'ul',
  template: JST["listings/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    //this.listenTo(this.subviews, "change", this.removeRequestView)
  },

  events: {
    'click .request-to-book': 'addRequestFormView'
    //'submit form': 'book'
  },

  addRequestFormView: function (event) {
    event.preventDefault();
    this.requestNewView = new Airfnf.Views.RequestNew();
    // var that = this;  ???
    this.addSubview('.request-new', this.requestNewView);
  },
  //
  // book: function (event) {
  //   event.preventDefault();
  //   var attrs = $(event.currentTarget).serializeJSON().request;
  //   var that = this;
  //
  //   this.model.set(attrs);
  //   this.model.save({}, {
  //     success: function () {
  //       this.removeSubview('.request-new', this.requestNewView);
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
