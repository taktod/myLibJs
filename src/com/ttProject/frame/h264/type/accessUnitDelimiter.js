goog.provide("com.ttProject.frame.h264.type.AccessUnitDelimiter");

goog.require("com.ttProject.frame.h264.H264Frame");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit5");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.AccessUnitDelimiter = function(forbiddenZeroBit, nalRefIdc, type) {
	if(forbiddenZeroBit == undefined) {
		forbiddenZeroBit = new com.ttProject.bit.Bit1();
	}
	if(nalRefIdc == undefined) {
		nalRefIdc = new com.ttProject.bit.Bit2();
	}
	if(type == undefined) {
		type = new com.ttProject.bit.Bit5(0x09);
	}
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	this._buffer = new Uint8Array([0xF0]);
	this.setSize(2);
};

goog.inherits(com.ttProject.frame.h264.type.AccessUnitDelimiter, com.ttProject.frame.h264.H264Frame);

com.ttProject.frame.h264.type.AccessUnitDelimiter.prototype.minimumLoad = function(channel, callback) {
	this.setSize(channel.size());
	callback();
};

com.ttProject.frame.h264.type.AccessUnitDelimiter.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getSize() - 1, function(data) {
		_this._buffer = data;
		callback();
	});
};
