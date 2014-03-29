goog.provide("com.ttProject.frame.base.VideoSelector");

/**
 * @constructor
 */
com.ttProject.frame.base.VideoSelector = function(){
	this._width  = null;
	this._height = null;
};

com.ttProject.frame.base.VideoSelector.prototype.setup = function(frame) {
	frame.setWidth(this._width);
	frame.setHeight(this._height);
};

com.ttProject.frame.base.VideoSelector.prototype.setWidth = function(width) {
	this._width = width;
};

com.ttProject.frame.base.VideoSelector.prototype.setHeight = function(height) {
	this._height = height;
};