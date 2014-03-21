goog.provide("com.ttProject.frame.h264.type.SliceIDR");

goog.require("com.ttProject.frame.h264.SliceFrame");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.SliceIDR = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this.setKeyFrame(true);
	this._buffer = null;
};

goog.inherits(com.ttProject.frame.h264.type.SliceIDR, com.ttProject.frame.h264.SliceFrame);

com.ttProject.frame.h264.type.SliceIDR.prototype.load = function(channel, callback) {
	var _this = this;
	// bufferの中身を保持しておく。
	channel.read(channel.size() - channel.position(), function(data) {
		_this._buffer = data;
		callback();
	});
};
