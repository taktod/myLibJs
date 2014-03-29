goog.provide("com.ttProject.container.mkv.type.SimpleBlock");

goog.require("com.ttProject.container.mkv.MkvBlockTag");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.BitLoader");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SimpleBlock = function(id, size) {
	goog.base(this, id, size);
	this._keyFrameFlag = new com.ttProject.bit.Bit1();
	this._reserved = new com.ttProject.bit.Bit3();
	this._invisibleFrameFlag = new com.ttProject.bit.Bit1();
	this._lacing = new com.ttProject.bit.Bit2();
	this._discardableFlag = new com.ttProject.bit.Bit1();
};

goog.inherits(com.ttProject.container.mkv.type.SimpleBlock, com.ttProject.container.mkv.MkvBlockTag);

com.ttProject.container.mkv.type.SimpleBlock.prototype.getRemainedSize = function() {
	return this.getMkvSize() - (this.getTrackId().getBitCount() + 24) / 8;
};

com.ttProject.container.mkv.type.SimpleBlock.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	goog.base(this, "minimumLoad", channel, function() {
		var loader = new com.ttProject.bit.BitLoader(channel);
		loader.load(_this._keyFrameFlag, _this._reserved, _this._invisibleFrameFlag,
				_this._lacing, _this._discardableFlag, callback);
	});
};

/**
 * lacingの設定データを参照する。
 * @returns
 */
com.ttProject.container.mkv.type.SimpleBlock.prototype.getLacingType = function() {
	return this._lacing.get();
};
