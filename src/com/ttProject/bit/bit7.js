goog.provide("com.ttProject.bit.Bit7");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit7定義
 */
(function(path) {
	path.Bit7 = function(value) {
		goog.base(this, 7);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit7, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit7.prototype.set = function(val) {
		goog.base(this, "set", val & 0x7F);
	};
})(com.ttProject.bit);