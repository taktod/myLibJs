goog.provide("com.ttProject.frame.h264.type.Slice");

goog.require("com.ttProject.frame.h264.SliceFrame");
goog.require("com.ttProject.util.ArrayUtil");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.Slice = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this._buffer = null;
};

goog.inherits(com.ttProject.frame.h264.type.Slice, com.ttProject.frame.h264.SliceFrame);

com.ttProject.frame.h264.type.Slice.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(channel.size() - channel.position(), function(data) {
		_this._buffer = data;
		callback();
	});
};

com.ttProject.frame.h264.type.Slice.prototype.getData = function() {
	return com.ttProject.util.ArrayUtil.connect(
			this.getTypeBuffer(),
			this.getSliceHeaderBuffer(),
			this._buffer
	);
};
