goog.provide("com.ttProject.container.mp3.Mp3Unit");

goog.require("com.ttProject.container.base.Unit");

/**
 * @constructor
 */
com.ttProject.container.mp3.Mp3Unit = function(frame, position) {
	goog.base(this);
	this._frame = frame;
	this._position = position;
};

goog.inherits(com.ttProject.container.mp3.Mp3Unit, com.ttProject.container.base.Unit);

com.ttProject.container.mp3.Mp3Unit.prototype.minimumLoad = function(channel, callback) {
	// 特にすることなし
	callback();
};

com.ttProject.container.mp3.Mp3Unit.prototype.load = function(channel, callback) {
	this._frame.load(channel, callback);
};

com.ttProject.container.mp3.Mp3Unit.prototype.getFrame = function() {
	return this._frame;
};

com.ttProject.container.mp3.Mp3Unit.prototype.getData = function() {
	return this._frame.getData();
};

com.ttProject.container.mp3.Mp3Unit.prototype.toString = function() {
	return "mp3Unit:ts:" + this.getPts();
};
