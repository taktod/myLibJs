goog.provide("com.ttProject.bit.super.BitN");

goog.require("com.ttProject.bit.super.Bit");

/**
 * 複数bitによる結合データ
 */
(function(path){
	/**
	 * @constructor
	 */
	path.BitN = function() {
		this.bits = [];
		var count = 0;
		for(var i = 0;i < arguments.length;i ++) {
			var bit = arguments[i];
			if(bit == null || !(bit instanceof path.Bit)) {
				continue;
			}
			count += bit.getBitCount();
			this.bits.push(bit);
		}
		goog.base(this, count);
	};
	goog.inherits(path.BitN, path.Bit);
	path.BitN.prototype.bits;
	path.BitN.prototype.get = function() {
		var value = 0;
		for(var i = 0;i < this.bits.length;i ++) {
			var bit = this.bits[i];
			value <<= bit.getBitCount();
			value |= bit.get();
		}
		return value;
	};
	path.BitN.prototype.set = function(value) {
		var size = this.bits.length;
		for(var i = size - 1;i >= 0;i --) {
			var bit = this.bits[i];
			bit.set(value);
			value >>>= bit.getBitCount();
		}
	};
	// getLong、setLongはjavascriptに型の概念がなさそうなので、そのままおいときます。
})(com.ttProject.bit.super);