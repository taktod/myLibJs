goog.provide("com.ttProject.bit.Bit1");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit1 = function(value) {
	goog.base(this, 1);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit1, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit1.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x01);
	}
};
