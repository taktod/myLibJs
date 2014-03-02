goog.provide("com.ttProject.bit.Bit1");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit1定義
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.Bit1 = function(value) {
		goog.base(this, 1);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit1, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit1.prototype.set = function(val) {
		goog.base(this, "set", val & 0x01);
	};
})(com.ttProject.bit);