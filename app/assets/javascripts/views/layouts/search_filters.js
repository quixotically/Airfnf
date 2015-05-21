Airfnf.Views.SearchFilters = Backbone.View.extend({
  tagName: "ul",

  template: JST["layouts/search_filters"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    // jQuery slider plugin
    this.$(".price-slider").slider({
      range: true, min: 10, max: 1000, values: [ 10, 1000 ],
      slide: function( event, ui ) {
        this.$( ".amount" ).val( "$" + ui.values[0] + " - $" + ui.values[1] + (ui.values[1] === this.$(".price-slider").slider("option", "max") ? "+": ""));
      }.bind(this)
    });
    this.$(".amount").val("$" + this.$(".price-slider").slider("values", 0) + " - $" + this.$(".price-slider").slider("values", 1) + "+");

    return this;
  }
});
