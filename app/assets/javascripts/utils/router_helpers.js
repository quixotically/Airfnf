Backbone.Router.prototype.sessionNew = function (callback) {
	if (!this._requireSignedOut(callback)) { return; }

	var view = new Airfnf.Views.SessionNew({
		callback: callback
	});

	Airfnf._swapModalView(view);
}

Backbone.Router.prototype._requireSignedIn = function (callback) {
	if (!Airfnf.currentUser.isSignedIn()) {
		Airfnf._flashMessage("You must be signed in to perform that action", "error");
		callback = callback || this._goHome.bind(this);
		this.sessionNew(callback);
		return false;
		//Backbone.history.navigate("", { trigger: true });
	}

	return true;
}

Backbone.Router.prototype._requireSignedOut = function (callback) {
	if (Airfnf.currentUser.isSignedIn()) {
		callback = callback || this._goHome.bind(this);
		callback();
		return false;
	}

	return true;
}

Backbone.Router.prototype._goHome = function () {
	Backbone.history.navigate('', { trigger: true });
}

Backbone.Router.prototype._swapView = function (view) {
	this._currentView && this._currentView.remove();
	this._currentView = view;
	this.$rootEl.html(view.render().$el);
}
