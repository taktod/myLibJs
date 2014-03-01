goog.provide("com.ttProject.bit.Bit8");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit8定義
 */
(function(path) {
	path.Bit8 = function(value) {
		goog.base(this, 8);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit8, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit8.prototype.set = function(val) {
		goog.base(this, "set", val & 0xFF);
	};
})(com.ttProject.bit);