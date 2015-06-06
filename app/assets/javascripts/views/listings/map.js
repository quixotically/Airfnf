Airfnf.Views.Map = Backbone.View.extend({
  // Initialization
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  initMap: function () {
    var location = this.collection.location
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latlng = results[0].geometry.location;
        var mapOptions = {
          center: latlng,
          zoom: 12
        };

        this._map = new google.maps.Map(this.el, mapOptions);

        this.collection.each(this.addMarker.bind(this));
        this.attachMapListeners();
      } else {
        Airfnf._flashMessage("Geocode was not successful for the following reason: " + status, "error");
      }
    }.bind(this));
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
      position: { lat: listing.get('latitude'), lng: listing.get('longitude') },
      map: this._map,
      title: listing.get('description')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[listing.id] = marker;
  },

  createListing: function (event) {
    //debugger;
    var listing = new Airfnf.Models.Listing({
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
  //  // get filtered collection here
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
