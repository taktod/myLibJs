goog.provide("com.ttProject.bit.Bit4");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit4 = function(value) {
	goog.base(this, 4);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit4, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit4.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x0F);
	}
};
