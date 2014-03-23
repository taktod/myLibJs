goog.provide("com.ttProject.bit.Seg");

goog.require("com.ttProject.bit.base.ExpGolomb");

/**
 * @constructor
 */
com.ttProject.bit.Seg = function() {
	goog.base(this);
};
// 継承させておく
goog.inherits(com.ttProject.bit.Seg, com.ttProject.bit.base.ExpGolomb);

com.ttProject.bit.Seg.prototype.get = function() {
	var val = this.getData();
	if((val & 0x01) == 1) {
		return -1 * (val >>> 1);
	}
	else {
		return (val >>> 1);
	}
};

com.ttProject.bit.Seg.prototype.set = function(val) {
	if(val > 0) {
		this.setData(val << 1);
	}
	else {
		this.setData((-1 * val) << 1 | 1);
	}
};
