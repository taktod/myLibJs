goog.provide("com.ttProject.bit.Bit8");

goog.require("com.ttProject.bit.super.Bit");

com.ttProject.bit.Bit8 = function(value) {
	goog.base(this, 8);
	if(value != undefined) {
		this.set(value);
	}
};
goog.inherits(com.ttProject.bit.Bit8, com.ttProject.bit.super.Bit);
com.ttProject.bit.Bit8.prototype.set = function(val) {
	goog.base(this, "set", val & 0xFF);
};
