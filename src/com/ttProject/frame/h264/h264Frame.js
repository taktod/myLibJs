goog.provide("com.ttProject.frame.h264.H264Frame");

goog.require("com.ttProject.frame.base.VideoFrame");
goog.require("com.ttProject.bit.BitConnector");

/**
 * @constructor
 */
com.ttProject.frame.h264.H264Frame = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this);
	this._forbiddenZeroBit = forbiddenZeroBit;
	this._nalRefIdc = nalRefIdc;
	this._type = type;
	
	this._sps = null;
	this._pps = null;
	this._frameList = null; // 複数フレームで同一データとする場合のフレームリスト
};

goog.inherits(com.ttProject.frame.h264.H264Frame, com.ttProject.frame.base.VideoFrame);

com.ttProject.frame.h264.H264Frame.prototype.getTypeBuffer = function() {
	var connector = new com.ttProject.bit.BitConnector();
	return connector.connect(this._forbiddenZeroBit, this._nalRefIdc, this._type);
};

com.ttProject.frame.h264.H264Frame.prototype.setPps = function(pps) {
	this._pps = pps;
};

com.ttProject.frame.h264.H264Frame.prototype.setSps = function(sps) {
	this._sps = sps;
	if(sps != null) {
		this.setWidth(sps.getWidth());
		this.setHeight(sps.getHeight());
	}
};

com.ttProject.frame.h264.H264Frame.prototype.getSps = function() {
	return this._sps;
};

com.ttProject.frame.h264.H264Frame.prototype.getPps = function() {
	return this._pps;
};

com.ttProject.frame.h264.H264Frame.prototype.addFrame = function(frame) {
	if(this._frameList == null) {
		this._frameList = [];
	}
	this._frameList.push(frame);
};

com.ttProject.frame.h264.H264Frame.prototype.getGroupFrameList = function() {
	return this._frameList;
};

/*
com.ttProject.frame.h264.H264Frame.prototype.isFirstNal = function() {
	if(this._frameList == null) {
		return false;
	}
	// frameListにはいっているデータのhashCodeとこのhashCodeが一致しなかったらfalse
	return true;
};
*/

