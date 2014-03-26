goog.provide("com.ttProject.bit.base.BitN");

goog.require("com.ttProject.bit.base.Bit");

/**
 * 複数Bitから新しいBitをつくる動作
 */
/**
 * @constructor
 */
com.ttProject.bit.base.BitN = function() {
	this._bits = [];
	var count = 0;
	var _this = this;
	var addBit = function(bit) {
		if(bit == null || !(bit instanceof com.ttProject.bit.base.Bit)) {
			return;
		}
		count += bit.getBitCount();
		_this._bits.push(bit);
	};
	for(var i = 0;i < arguments.length;i ++) {
		var bit = arguments[i];
		if(bit instanceof Array) {
			bit.forEach(addBit);
			continue;
		}
		addBit(bit);
	}
	goog.base(this, count);
};
// 継承しておく。
goog.inherits(com.ttProject.bit.base.BitN, com.ttProject.bit.base.Bit);
/**
 * データ取得
 * @returns {Number}
 */
com.ttProject.bit.base.BitN.prototype.get = function() {
	var value = 0;
	for(var i = 0;i < this._bits.length;i ++) {
		var bit = this._bits[i];
		value <<= bit.getBitCount();
		value |= bit.get();
	}
	return value;
};
/**
 * データ設定
 * @param value
 */
com.ttProject.bit.base.BitN.prototype.set = function(value) {
	var size = this._bits.length;
	for(var i = size - 1;i >= 0;i --) {
		var bit = this._bits[i];
		bit.set(value);
		value >>>= bit.getBitCount();
	}
};
/**
 * 中身dump
 */
com.ttProject.bit.base.BitN.prototype.toString = function() {
	var data = "";
	for(var i = 0;i < this._bits.length;i ++) {
		var bit = this._bits[i];
		data += bit.toString();
	}
	return data;
};
