goog.provide("com.ttProject.bit.Ueg");

goog.require("com.ttProject.bit.super.ExpGolomb");

/**
 * unsigned ExpGolombの定義
 */
(function(path) {
	/**
	 * @constractor
	 */
	path.Ueg = function() {
		goog.base(this);
	};
	// 継承しておく
	goog.inherits(path.Ueg, path.super.ExpGolomb);
	path.Ueg.prototype.get = function() {
		return goog.base(this, "getData") - 1;
	};
	path.Ueg.prototype.set = function(val) {
		goog.base(this, "setData", val + 1);
	};
})(com.ttProject.bit);
