goog.provide("com.ttProject.bit.Bit4");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit4定義
 */
(function(path) {
	path.Bit4 = function(value) {
		goog.base(this, 4);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit4, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit4.prototype.set = function(val) {
		goog.base(this, "set", val & 0x0F);
	};
})(com.ttProject.bit);