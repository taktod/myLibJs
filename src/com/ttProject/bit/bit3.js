goog.provide("com.ttProject.bit.Bit3");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit3 = function(value) {
	goog.base(this, 3);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit3, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit3.prototype.set = function(val) {
	goog.base(this, "set", val & 0x07);
};
