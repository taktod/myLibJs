goog.provide("com.ttProject.bit.Bit5");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit5 = function(value) {
	goog.base(this, 5);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit5, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit5.prototype.set = function(val) {
	goog.base(this, "set", val & 0x1F);
};
