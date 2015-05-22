Airfnf.Views.Map = Backbone.View.extend({
  // Initialization
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};
    this.initMap();

    // this.listenTo(this.collection, 'add', this.addMarker);
    // this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 40.6975, lng: -73.9797 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    //this.collection.each(this.addMarker.bind(this));
    //this.attachMapListeners();
  }
});
