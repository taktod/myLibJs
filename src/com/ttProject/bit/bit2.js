goog.provide("com.ttProject.bit.Bit2");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit2 = function(value) {
	goog.base(this, 2);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit2, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit2.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0x03);
	}
};
