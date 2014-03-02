goog.provide("com.ttProject.util.BitUtil");

/**
 * 数値をbitデータの文字列に変換します
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.BitUtil = function() {
	};
	path.BitUtil.toBit = function(val, length) {
		var output = "";
		while(length > 0) {
			output = (val & 0x01) + output;
			val >>>= 1;
			length --;
		}
		return output;
	};
})(com.ttProject.util);
