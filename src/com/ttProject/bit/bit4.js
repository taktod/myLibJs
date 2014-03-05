goog.provide("com.ttProject.bit.Bit4");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit4 = function(value) {
	goog.base(this, 4);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit4, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit4.prototype.set = function(val) {
	goog.base(this, "set", val & 0x0F);
};
