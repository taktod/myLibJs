goog.provide("com.ttProject.bit.Bit6");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit6 = function(value) {
	goog.base(this, 6);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit6, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit6.prototype.set = function(val) {
	goog.base(this, "set", val & 0x3F);
};
