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

Airfnf._flashMessage = function (msg, type) {
  type === "error" ? $("#flash").addClass("error") : $("#flash").addClass("success");
  $("#flash").removeClass("hidden");

  if (msg instanceof Array) {
    $("#flash").html(JST["layouts/errors"]({ msgs: msg }));
  } else {
    $("#flash").html(msg);
  }
  window.setTimeout(function() {
    $("#flash").empty();
    $("#flash").removeClass("error success");
    $("#flash").addClass("hidden");
  }, 3000);
}
