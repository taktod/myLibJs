goog.provide("com.ttProject.frame.aac.type.Frame");

goog.require("com.ttProject.frame.aac.AacFrame");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit11");
goog.require("com.ttProject.bit.Bit12");
goog.require("com.ttProject.bit.Bit13");

/**
 * aacの音声部分の実体
 * @constructor
 */
com.ttProject.frame.aac.type.Frame = function() {
	goog.base(this);
	this._syncBit                      = new com.ttProject.bit.Bit12(0x0FFF);
	this._id                           = new com.ttProject.bit.Bit1();
	this._layer                        = new com.ttProject.bit.Bit2();
	this._protectionAbsent             = new com.ttProject.bit.Bit1(1);
	this._profile                      = new com.ttProject.bit.Bit2(); // -1した値がはいっているみたい。
	this._samplingFrequenceIndex       = new com.ttProject.bit.Bit4(4);
	this._privateBit                   = new com.ttProject.bit.Bit1(1);
	this._channelConfiguration         = new com.ttProject.bit.Bit3(2);
	this._originalFlg                  = new com.ttProject.bit.Bit1(1);
	this._home                         = new com.ttProject.bit.Bit1();
	this._copyrightIdentificationBit   = new com.ttProject.bit.Bit1();
	this._copyrightIdentificationStart = new com.ttProject.bit.Bit1();
	this._frameSize                    = new com.ttProject.bit.Bit13(0);
	this._adtsBufferFullness           = new com.ttProject.bit.Bit11(0x7FF);
	this._noRawDataBlocksInFrame       = new com.ttProject.bit.Bit2();
	this._rawBuffer;
};

goog.inherits(com.ttProject.frame.aac.type.Frame, com.ttProject.frame.aac.AacFrame);

