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
		this.value = 0;
	};
	path.Bit.prototype.value;
	path.Bit.prototype.bitCount;
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
})(com.ttProject.bit.super);