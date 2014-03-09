goog.provide("com.ttProject.frame.mp3.type.Id3Frame");

goog.require("com.ttProject.frame.mp3.Mp3Frame");
goog.require("com.ttProject.bit.Bit24");
goog.require("com.ttProject.bit.Bit16");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit7");

/**
 * @constructor
 */
com.ttProject.frame.mp3.type.Id3Frame = function() {
	this._signature = new com.ttProject.bit.Bit24();
	this._version   = new com.ttProject.bit.Bit16();
	this._flag      = new com.ttProject.bit.Bit8();
	this._dummy1    = new com.ttProject.bit.Bit1();
	this._size1     = new com.ttProject.bit.Bit7();
	this._dummy2    = new com.ttProject.bit.Bit1();
	this._size2     = new com.ttProject.bit.Bit7();
	this._dummy3    = new com.ttProject.bit.Bit1();
	this._size3     = new com.ttProject.bit.Bit7();
	this._dummy4    = new com.ttProject.bit.Bit1();
	this._size4     = new com.ttProject.bit.Bit7();
	this._data;
};

goog.inherit(com.ttProject.frame.mp3.type.Id3Frame, com.ttProject.frame.mp3.Mp3Frame);

