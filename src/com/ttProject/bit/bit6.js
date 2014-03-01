goog.provide("com.ttProject.bit.Bit6");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit6定義
 */
(function(path) {
	path.Bit6 = function(value) {
		goog.base(this, 6);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit6, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit6.prototype.set = function(val) {
		goog.base(this, "set", val & 0x3F);
	};
})(com.ttProject.bit);