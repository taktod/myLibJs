goog.provide("com.ttProject.bit.Bit3");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit3 = function(value) {
	goog.base(this, 3);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit3, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit3.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x07);
	}
};
