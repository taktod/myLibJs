goog.provide("com.ttProject.container.adts.AdtsUnit");

goog.require("com.ttProject.container.super.Unit");

/**
 * @constructor
 */
com.ttProject.container.adts.AdtsUnit = function(frame, position) {
	this._frame = frame;
	this._position = position;
};

goog.inherits(com.ttProject.container.adts.AdtsUnit, com.ttProject.container.super.Unit);

com.ttProject.container.adts.AdtsUnit.prototype.minimumLoad = function(channel, callback) {
	callback();
};

com.ttProject.container.adts.AdtsUnit.prototype.load = function(channel, callback) {
	this._frame.load(channel, callback);
};

com.ttProject.container.adts.AdtsUnit.prototype.getFrame = function() {
	return this._frame;
};

com.ttProject.container.adts.AdtsUnit.prototype.getData = function() {
	return this._frame.getData();
};