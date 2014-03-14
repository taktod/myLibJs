goog.provide("com.ttProject.bit.Ueg");

goog.require("com.ttProject.bit.super.ExpGolomb");

/**
 * @constractor
 */
com.ttProject.bit.Ueg = function() {
	goog.base(this);
};
// 継承しておく
goog.inherits(com.ttProject.bit.Ueg, com.ttProject.bit.super.ExpGolomb);
com.ttProject.bit.Ueg.prototype.get = function() {
	return this.getData() - 1;
};

com.ttProject.bit.Ueg.prototype.set = function(val) {
	this.setData(val + 1);
};
