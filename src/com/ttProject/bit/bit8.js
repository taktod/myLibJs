goog.provide("com.ttProject.bit.Bit8");

goog.require("com.ttProject.bit.base.Bit");

/**
 * @constructor
 */
com.ttProject.bit.Bit8 = function(value) {
	goog.base(this, 8);
	this.set(value);
};

goog.inherits(com.ttProject.bit.Bit8, com.ttProject.bit.base.Bit);

com.ttProject.bit.Bit8.prototype.set = function(val) {
	if(val != undefined) {
		goog.base(this, "set", val & 0xFF);
	}
};
