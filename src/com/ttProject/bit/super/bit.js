goog.provide("com.ttProject.bit.super.Bit");

goog.require("com.ttProject.util.BitUtil");

/**
 * Bitを扱う動作のベース
 */
/**
 * @constructor
 */
com.ttProject.bit.super.Bit = function(count) {
	this._bitCount = count;
	this._value = 0;
};
/**
 * データ設定
 * @param value
 */
com.ttProject.bit.super.Bit.prototype.set = function(val) {
	this._value = val;
};
/**
 * データ参照
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.get = function() {
	return this._value;
};
/**
 * データの長さ参照
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.getBitCount = function() {
	return this._bitCount;
};
/**
 * データの長さ設定
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.setBitCount = function(val) {
	this._bitCount = val;
};
/**
 * データDump
 */
com.ttProject.bit.super.Bit.prototype.toString = function() {
	return com.ttProject.util.BitUtil.toBit(this._value, this._bitCount);
};
