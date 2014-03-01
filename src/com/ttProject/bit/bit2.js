goog.provide("com.ttProject.bit.Bit2");

goog.require("com.ttProject.bit.super.Bit");

/**
 * bit2定義
 */
(function(path) {
	path.Bit2 = function(value) {
		goog.base(this, 2);
		if(value != undefined) {
			this.set(value);
		}
	};
	goog.inherits(path.Bit2, path.super.Bit); // scopeが同じなら、pathで補えるみたいですね
	path.Bit2.prototype.set = function(val) {
		goog.base(this, "set", val & 0x03);
	};
})(com.ttProject.bit);