goog.provide("com.ttProject.frame.h264.type.PictureParameterSet");

goog.require("com.ttProject.frame.h264.H264Frame");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.PictureParameterSet = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this._buffer;
};

goog.inherits(com.ttProject.frame.h264.type.PictureParameterSet, com.ttProject.frame.h264.H264Frame);

com.ttProject.frame.h264.type.PictureParameterSet.prototype.minimumLoad = function(channel, callback) {
	this.setSize(channel.size());
	callback();
};

com.ttProject.frame.h264.type.PictureParameterSet.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getSize() - 1, function(data) {
		_this._buffer = data;
	});
};


