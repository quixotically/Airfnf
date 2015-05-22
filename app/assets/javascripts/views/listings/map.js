Airfnf.Views.Map = Backbone.View.extend({
  // Initialization
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};
    this.initMap();

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 40.6975, lng: -73.9797 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    //google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    google.maps.event.addListener(this._map, 'click', this.createListing.bind(this));
  },

  // Event handlers
  addMarker: function (listing) {
    if (this._markers[listing.id]) { return };
    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: 40.6975, lng: -73.9797 },
      map: this._map,
      title: listing.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[listing.id] = marker;
  },

  createListing: function (event) {
    var listing = new GoogleMapsDemo.Models.Listing({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });

    listing.save({}, {
      success: function () {
        this.collection.add(listing);
      }.bind(this)
    });
  },

  // search: function () {
  //   // This method will re-fetch the map's collection, using the
  //   // map's current bounds as constraints on latitude/longitude.
  //
  //   var mapBounds = this._map.getBounds();
  //   var ne = mapBounds.getNorthEast();
  //   var sw = mapBounds.getSouthWest();
  //
  //   var filterData = {
  //     lat: [sw.lat(), ne.lat()],
  //     lng: [sw.lng(), ne.lng()]
  //   };
  //
  //   this.collection.fetch({
  //     data: { filter_data: filterData }
  //   });
  // },

  removeMarker: function (listing) {
    var marker = this._markers[listing.id];
    marker.setMap(null);
    delete this._markers[listing.id];
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  },

  startBounce: function (id) {
    var marker = this._markers[id];
    //marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (id) {
    var marker = this._markers[id];
  //  marker.setAnimation(null);
  }
});
