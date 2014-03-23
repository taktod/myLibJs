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
	goog.base(this);
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
	this._buffer = null;
};

goog.inherits(com.ttProject.frame.mp3.type.Id3Frame, com.ttProject.frame.mp3.Mp3Frame);

/**
 * 最低限ロード
 * @param channel
 * @param callback
 */
com.ttProject.frame.mp3.type.Id3Frame.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	var signature = new com.ttProject.bit.Bit16();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(signature, this._version, this._flag,
			this._dummy1, this._size1, this._dummy2, this._size2,
			this._dummy3, this._size3, this._dummy4, this._size4,
			function() {
		_this._signature.set(0x49 << 16 | signature.get());
		// このデータのサイズは
		_this.setSize(10 + (_this._size1.get() << 21 | _this._size2.get() << 14 | _this._size3.get() << 7 | _this._size4.get()));
		console.log(_this.getSize());
		callback();
	});
};

/**
 * detailロード
 * @param channel
 * @param callback
 */
com.ttProject.frame.mp3.type.Id3Frame.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getSize() - 10, function(data) {
		_this._buffer = data;
		callback();
	});
};
