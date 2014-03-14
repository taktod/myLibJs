goog.provide("com.ttProject.frame.h264.type.SupplementalEnhancementInformation");

goog.require("com.ttProject.frame.h264.H264Frame");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.SupplementalEnhancementInformation = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this._buffer = null;
};

goog.inherits(com.ttProject.frame.h264.type.SupplementalEnhancementInformation, com.ttProject.frame.h264.H264Frame);

com.ttProject.frame.h264.type.SupplementalEnhancementInformation.prototype.minimumLoad = function(channel, callback) {
	this.setSize(channel.size());
	callback();
};

com.ttProject.frame.h264.type.SupplementalEnhancementInformation.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getSize() - 1, function(data) {
		_this._buffer = data;
		callback();
	});
};

