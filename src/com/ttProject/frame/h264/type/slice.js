goog.provide("com.ttProject.frame.h264.type.Slice");

goog.require("com.ttProject.frame.h264.SliceFrame");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.Slice = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
};

goog.inherits(com.ttProject.frame.h264.type.Slice, com.ttProject.frame.h264.SliceFrame);

com.ttProject.frame.h264.type.Slice.prototype.minimumLoad = function(channel, callback) {
	goog.base(this, "minimumLoad", channel, function() {
		// ここきた？
		callback();
	});
};
