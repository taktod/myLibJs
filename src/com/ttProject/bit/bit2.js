goog.provide("com.ttProject.bit.Bit2");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit2 = function(value) {
	goog.base(this, 2);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit2, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit2.prototype.set = function(val) {
	goog.base(this, "set", val & 0x03);
};
