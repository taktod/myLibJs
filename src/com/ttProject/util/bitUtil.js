goog.provide("com.ttProject.util.BitUtil");

/**
 * @constructor
 */
com.ttProject.util.BitUtil = function() {
};
com.ttProject.util.BitUtil.toBit = function(val, length) {
	var output = "";
	while(length > 0) {
		output = (val & 0x01) + output;
		val >>>= 1;
		length --;
	}
	return output;
};
