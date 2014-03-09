goog.provide("com.ttProject.frame.mp3.type.Frame");

goog.require("com.ttProject.frame.mp3.Mp3Frame");
goog.require("com.ttProject.bit.Bit11");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit4");

/**
 * mp3の音声部分の実体
 * @constructor
 */
com.ttProject.frame.mp3.type.Frame = function() {
	this._syncBit           = new com.ttProject.bit.Bit11();
	this._mpegVersion       = new com.ttProject.bit.Bit2();
	this._layer             = new com.ttProject.bit.Bit2();
	this._protectionBit     = new com.ttProject.bit.Bit1();
	this._bitrateIndex      = new com.ttProject.bit.Bit4();
	this._samplingRateIndex = new com.ttProject.bit.Bit2();
	this._paddingBit        = new com.ttProject.bit.Bit1();
	this._privateBit        = new com.ttProject.bit.Bit1();
	this._channelMode       = new com.ttProject.bit.Bit2();
	this._modeExtension     = new com.ttProject.bit.Bit2();
	this._copyRight         = new com.ttProject.bit.Bit1();
	this._originalFlag      = new com.ttProject.bit.Bit1();
	this._emphasis          = new com.ttProject.bit.Bit2();
	this._rawBuffer;
};

goog.inherits(com.ttProject.frame.mp3.type.Frame, com.ttProject.frame.mp3.Mp3Frame);

