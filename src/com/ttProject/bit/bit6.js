goog.provide("com.ttProject.bit.Bit6");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit6 = function(value) {
	goog.base(this, 6);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit6, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit6.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x3F);
	}
};
