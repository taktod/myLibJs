goog.provide("com.ttProject.container.mkv.MkvUtf8Tag");

goog.require("com.ttProject.container.mkv.MkvTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvUtf8Tag = function(id, size) {
	goog.base(this, id, size);
	this._str = null;
};

goog.inherits(com.ttProject.container.mkv.MkvUtf8Tag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvUtf8Tag.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getMkvSize(), function(data) {
		var reader = new FileReader();
		reader.onload = function() {
			_this._str = reader.result;
			callback();
		};
		reader.readAsText(new Blob([data]));
	});
};

com.ttProject.container.mkv.MkvUtf8Tag.prototype.getValue = function() {
	return this._str;
};
