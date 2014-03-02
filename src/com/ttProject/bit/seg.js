goog.provide("com.ttProject.bit.Seg");

goog.require("com.ttProject.bit.super.ExpGolomb");

/**
 * signed ExpGolombのオブジェクト
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.Seg = function() {
		goog.base(this);
	};
	// 継承させておく
	goog.inherits(path.Seg, path.super.ExpGolomb);
	path.Seg.prototype.get = function() {
//		var val = goog.base(this, "getData");
		var val = this.getData();
		if((val & 0x01) == 1) {
			return -1 * (value >>> 1);
		}
		else {
			return (value >>> 1);
		}
	};
	path.Seg.prototype.set = function(val) {
		if(val > 0) {
//			goog.base(this, "setData", (val << 1));
			this.setData(val << 1);
		}
		else {
//			goog.base(this, "setData", ((-1 * val) << 1) | 1);
			this.setData((-1 * val) << 1 | 1);
		}
	};
})(com.ttProject.bit);