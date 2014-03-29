goog.provide("com.ttProject.container.mkv.MkvBinaryTag");

goog.require("com.ttProject.container.mkv.MkvTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvBinaryTag = function(id, size) {
	goog.base(this, id, size);
	this._buffer = null;
};

goog.inherits(com.ttProject.container.mkv.MkvBinaryTag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvBinaryTag.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getRemainedSize(), function(data) {
		_this._buffer = data;
		callback();
	});
};

com.ttProject.container.mkv.MkvBinaryTag.prototype.getRemainedSize = function() {
	return this.getMkvSize();
};

com.ttProject.container.mkv.MkvBinaryTag.prototype.getMkvData = function() {
	return this._buffer;
};
