goog.provide("com.ttProject.frame.h264.H264Frame");

goog.require("com.ttProject.frame.super.VideoFrame");
/**
 * @constructor
 */
com.ttProject.frame.h264.H264Frame = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this);
	this._forbiddenZeroBit = forbiddenZeroBit;
	this._nalRefIdc = nalRefIdc;
	this._type = type;
	
	this._sps;
	this._pps;
	this._frameList; // 複数フレームで同一データとする場合のフレームリスト
};

goog.inherits(com.ttProject.frame.h264.H264Frame, com.ttProject.frame.super.VideoFrame);

com.ttProject.frame.h264.H264Frame.prototype.getTypeBuffer = function() {
	
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