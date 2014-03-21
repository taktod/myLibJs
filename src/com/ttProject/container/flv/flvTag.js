goog.provide("com.ttProject.container.flv.FlvTag");

goog.require("com.ttProject.container.super.Unit");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit24");
goog.require("com.ttProject.bit.Bit32");
goog.require("com.ttProject.bit.BitLoader");

/**
 * @constructor
 */
com.ttProject.container.flv.FlvTag = function(tagType) {
	goog.base(this);
	this._tagType      = tagType; // 0x08 audio 0x09 video 0x12 meta
	this._dataSize     = new com.ttProject.bit.Bit24();
	this._timestamp    = new com.ttProject.bit.Bit24();
	this._timestampExt = new com.ttProject.bit.Bit8();
	this._streamId     = new com.ttProject.bit.Bit24();
	this._prevTagSize  = new com.ttProject.bit.Bit32();
	this.setTimebase(1000); // flvはtimebaseが1/1000固定
};

goog.inherits(com.ttProject.container.flv.FlvTag, com.ttProject.container.super.Unit);

com.ttProject.container.flv.FlvTag.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(this._dataSize, this._timestamp, this._timestampExt, this._streamId,
			function() {
		_this._prevTagSize.set(_this._dataSize.get() + 11);
		_this.setPts(_this._timestampExt.get() << 24 | _this._timestamp.get());
		_this.setSize(_this._dataSize.get() + 11 + 4);
		callback();
	});
};
