Airfnf._swapModalView = function (view) {
  Airfnf._modalView && Airfnf._modalView.remove();
  Airfnf._modalView = view;
  $(".modal").html(view.render().$el);
  $(".modal").addClass("is-open");
}

Airfnf._removeModalView = function () {
  Airfnf._modalView && Airfnf._modalView.remove();
  $(".modal").removeClass("is-open");
}
