goog.provide("com.ttProject.bit.Bit7");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit7 = function(value) {
	goog.base(this, 7);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit7, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit7.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x7F);
	}
};
