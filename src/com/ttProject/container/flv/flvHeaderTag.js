goog.provide("com.ttProject.container.flv.FlvHeaderTag");

goog.require("com.ttProject.container.base.Unit");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit24");
goog.require("com.ttProject.bit.Bit32");
goog.require("com.ttProject.bit.BitLoader");

/**
 * @constructor
 */
com.ttProject.container.flv.FlvHeaderTag = function(signature) {
	goog.base(this);
	if(signature == undefined) {
		this._signature = new com.ttProject.bit.Bit24(0x464C56);
	}
	else {
		this._signature = signature;
	}
	this._version = new com.ttProject.bit.Bit8(1);
	this._reserved1 = new com.ttProject.bit.Bit5();
	this._audioFlag = new com.ttProject.bit.Bit1();
	this._reserved2 = new com.ttProject.bit.Bit1();
	this._videoFlag = new com.ttProject.bit.Bit1();
	this._length = new com.ttProject.bit.Bit32(9);
	this._reserved3 = new com.ttProject.bit.Bit32();
	this.setTimebase(1000); // flvはtimebaseが1/1000固定
	this.setSize(13);
};

goog.inherits(com.ttProject.container.flv.FlvHeaderTag, com.ttProject.container.base.Unit);

com.ttProject.container.flv.FlvHeaderTag.prototype.minimumLoad = function(channel, callback) {
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(this._version, this._reserved1, this._audioFlag,
			this._reserved2, this._videoFlag, this._length, this._reserved3,
			function() {
		callback();
	});
};

com.ttProject.container.flv.FlvHeaderTag.prototype.load = function(channel, callback) {
	callback();
};

com.ttProject.container.flv.FlvHeaderTag.prototype.toString = function() {
	return "flvHeaderTag:" + 
		(this._audioFlag.get() == 1 ? "audio " : "") + 
		(this._videoFlag.get() == 1 ? "video" : "");
};
