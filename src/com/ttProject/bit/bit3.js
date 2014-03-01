goog.provide("com.ttProject.bit.Bit3");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit3定義
 */
(function(path) {
	path.Bit3 = function(value) {
		goog.base(this, 3);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit3, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit3.prototype.set = function(val) {
		goog.base(this, "set", val & 0x07);
	};
})(com.ttProject.bit);