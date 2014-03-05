goog.provide("com.ttProject.bit.Bit1");

goog.require("com.ttProject.bit.super.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit1 = function(value) {
	goog.base(this, 1);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit1, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit1.prototype.set = function(val) {
	goog.base(this, "set", val & 0x01);
};
