goog.provide("com.ttProject.bit.Bit5");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit5 = function(value) {
	goog.base(this, 5);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit5, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit5.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x1F);
	}
};
