goog.provide("com.ttProject.frame.h264.H264FrameSelector");

goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.frame.h264.type.AccessUnitDelimiter");
goog.require("com.ttProject.frame.h264.type.PictureParameterSet");
goog.require("com.ttProject.frame.h264.type.SequenceParameterSet");
goog.require("com.ttProject.frame.h264.type.SupplementalEnhancementInformation");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit5");

/**
 * @constructor
 */
com.ttProject.frame.h264.H264FrameSelector = function() {
	this._sps = null;
	this._pps = null;
};

com.ttProject.frame.h264.H264FrameSelector.prototype.select = function(channel, callback) {
	var loader = new com.ttProject.bit.BitLoader(channel);
	var forbiddenZeroBit = new com.ttProject.bit.Bit1();
	var nalRefIdc = new com.ttProject.bit.Bit2();
	var type = new com.ttProject.bit.Bit5();
	loader.load(forbiddenZeroBit, nalRefIdc, type, function() {
		console.log("type:" + type.get());
	});
};
