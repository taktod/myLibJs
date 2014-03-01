goog.provide("com.ttProject.bit.super.Bit");

/**
 * bitデータの基本クラス
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.Bit = function(count) {
		this.bitCount = count;
	};
	path.Bit.prototype.value = 0;
	path.Bit.prototype.bitCount = 0;
	/**
	 * データ設定
	 * @param value
	 */
	path.Bit.prototype.set = function(val) {
		this.value = val;
	};
	/**
	 * データ参照
	 * @returns {Number}
	 */
	path.Bit.prototype.get = function() {
		return this.value;
	};
	/**
	 * データの長さ参照
	 * @returns {Number}
	 */
	path.Bit.prototype.getBitCount = function() {
		return this.bitCount;
	};
	/**
	 * データの長さ設定
	 * @returns {Number}
	 */
	path.Bit.prototype.setBitCount = function(val) {
		this.bitCount = val;
	};
	path.Bit.prototype.dump = function() {
		console.log("value:" + this.value);
		console.log("bitCount:" + this.bitCount);
	};
})(com.ttProject.bit.super);