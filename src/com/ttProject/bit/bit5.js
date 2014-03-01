goog.provide("com.ttProject.bit.Bit5");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit5定義
 */
(function(path) {
	path.Bit5 = function(value) {
		goog.base(this, 5);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit5, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit5.prototype.set = function(val) {
		goog.base(this, "set", val & 0x1F);
	};
})(com.ttProject.bit);