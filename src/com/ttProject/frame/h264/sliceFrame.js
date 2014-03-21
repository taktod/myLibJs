goog.provide("com.ttProject.frame.h264.SliceFrame");

goog.require("com.ttProject.frame.h264.H264Frame");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.Ueg");
goog.require("com.ttProject.bit.BitConnector");

/**
 * @constructor
 */
com.ttProject.frame.h264.SliceFrame = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this._firstMbInSlice        = new com.ttProject.bit.Ueg();
	this._sliceType             = new com.ttProject.bit.Ueg();
	this._pictureParameterSetId = new com.ttProject.bit.Ueg();
	this._extraBit              = null;
};

goog.inherits(com.ttProject.frame.h264.SliceFrame, com.ttProject.frame.h264.H264Frame);

com.ttProject.frame.h264.SliceFrame.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	this.setSize(channel.size());
	loader.load(this._firstMbInSlice, this._sliceType, this._pictureParameterSetId, function() {
		loader.getExtraBit(function(bit) {
			_this._extraBit = bit;
			callback();
		});
	});
};

com.ttProject.frame.h264.SliceFrame.prototype.getSliceHeaderBuffer = function() {
	var connector = new com.ttProject.bit.BitConnector();
	return connector.connect(
			this._firstMbInSlice,
			this._sliceType,
			this._pictureParameterSetId,
			this._extraBit
	);
};

com.ttProject.frame.h264.SliceFrame.prototype.getFirstMbInSlice = function() {
	return this._firstMbInSlice.get();
};
