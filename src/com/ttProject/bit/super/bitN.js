goog.provide("com.ttProject.bit.super.BitN");

goog.require("com.ttProject.bit.super.Bit");

/**
 * 複数bitによる結合データ
 */
(function(path){
	var bits = [];
	/**
	 * @constractor
	 */
	path.BitN = function() {
		console.log(arguments);
		var count = 0;
		for(var i = 0;i < arguments.length;i ++) {
			var bit = arguments[i];
			if(bit == null) {
				continue;
			}
			count += bit.getBitCount();
			bits.push(bit);
		}
		goog.base(this, count);
//		goog.base(this, "setBitCount", count);
	};
	goog.inherits(path.BitN, path.Bit);
	path.BitN.prototype.get = function() {
		var value = 0;
		for(var i = 0;i < bits.length;i ++) {
			var bit = bits[i];
			value <<= bit.getBitCount();
			value |= bit.get();
		}
		return value;
	};
	// getLongはjavascriptに型の概念がなさそうなので、そのままおいときます。
//	path.BitN.prototype.getLong = path.BitN.prototype.get;
	path.BitN.prototype.set = function(value) {
		var size = bits.length;
		for(var i = size - 1;i >= 0;i --) {
			var bit = bits[i];
			console.log(bit);
			console.log(value);
			console.log(bit.getBitCount());
			bit.set(value);
			value >>>= bit.getBitCount();
		}
	};
})(com.ttProject.bit.super);