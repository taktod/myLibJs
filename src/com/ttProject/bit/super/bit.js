goog.provide("com.ttProject.bit.super.Bit");

/**
 * bitデータの基本クラス
 */
(function(path) {
	var value = 0;
	var bitCount = 0;
	/**
	 * @constructor
	 */
	path.Bit = function(count) {
		bitCount = count;
	};
	/**
	 * データ設定
	 * @param value
	 */
	path.Bit.prototype.set = function(val) {
		value = val;
	};
	/**
	 * データ参照
	 * @returns {Number}
	 */
	path.Bit.prototype.get = function() {
		return value;
	};
	/**
	 * データの長さ参照
	 * @returns {Number}
	 */
	path.Bit.prototype.getBitCount = function() {
		return bitCount;
	};
	/**
	 * データの長さ設定
	 * @returns {Number}
	 */
	path.Bit.prototype.setBitCount = function(val) {
		bitCount = val;
	};
	path.Bit.prototype.dump = function() {
		console.log("value:" + value);
		console.log("bitCount:" + bitCount);
	};
})(com.ttProject.bit.super);