goog.provide("com.ttProject.container.mkv.MkvTag");

goog.require("com.ttProject.container.base.Unit");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvTag = function(id, size) {
	this._ebmlId = id;
	this._ebmlSize = size;
	this.setSize(size.get() + (id.getBitCount() + size.getBitCount()) / 8);
	this._reader = null;
};

goog.inherits(com.ttProject.container.mkv.MkvTag, com.ttProject.container.base.Unit);

com.ttProject.container.mkv.MkvTag.prototype.minimumLoad = function(channel, callback) {
	this._readPos = channel.position() - (this._ebmlId.getBitCount() + this._ebmlSize.getBitCount()) / 8;
	callback();
};

com.ttProject.container.mkv.MkvTag.prototype.load = function(channel, callback) {
	channel.position(this._readPos + this.getSize());
	callback();
};

com.ttProject.container.mkv.MkvTag.prototype.setMkvTagReader = function(reader) {
	this._reader = reader;
};

com.ttProject.container.mkv.MkvTag.prototype.getMkvTagReader = function() {
	return this._reader;
};

com.ttProject.container.mkv.MkvTag.prototype.getMkvSize = function() {
	return this._ebmlSize.get();
};
