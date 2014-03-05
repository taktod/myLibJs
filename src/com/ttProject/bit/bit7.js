goog.provide("com.ttProject.bit.Bit7");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit7 = function(value) {
	goog.base(this, 7);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit7, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit7.prototype.set = function(val) {
	goog.base(this, "set", val & 0x7F);
};
