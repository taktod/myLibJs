goog.provide("com.ttProject.bit.super.Bit");

goog.require("com.ttProject.util.BitUtil");

/**
 * Bitを扱う動作のベース
 */
/**
 * @constructor
 */
com.ttProject.bit.super.Bit = function(count) {
	this.bitCount = count;
	this.value = 0;
};
/**
 * データ設定
 * @param value
 */
com.ttProject.bit.super.Bit.prototype.set = function(val) {
	this.value = val;
};
/**
 * データ参照
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.get = function() {
	return this.value;
};
/**
 * データの長さ参照
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.getBitCount = function() {
	return this.bitCount;
};
/**
 * データの長さ設定
 * @returns {Number}
 */
com.ttProject.bit.super.Bit.prototype.setBitCount = function(val) {
	this.bitCount = val;
};
/**
 * データDump
 */
com.ttProject.bit.super.Bit.prototype.toString = function() {
	return com.ttProject.util.BitUtil.toBit(this.value, this.bitCount);
};
