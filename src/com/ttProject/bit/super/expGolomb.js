goog.provide("com.ttProject.bit.super.ExpGolomb");

goog.require("com.ttProject.bit.super.Bit");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit6");
goog.require("com.ttProject.bit.Bit7");
goog.require("com.ttProject.bit.Bit8");

/**
 * h264用のexpGolomb解析用
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.ExpGolomb = function() {
		// 初期化として0を表現しておきます。
		goog.base(this, 1);
		this.value = 0;
		this.zeroCount = 0;
		this.find1Flg = false;
		this.bits = [];
		this.bits.push(new com.ttProject.bit.Bit1(1));
	};
	// 継承しとく
	goog.inherits(path.ExpGolomb, path.Bit);
	// 内部変数定義
	path.ExpGolomb.prototype.value = null;
	path.ExpGolomb.prototype.zeroCount = null;
	path.ExpGolomb.prototype.find1Flg = null;
	path.ExpGolomb.prototype.bits = null;
	// 内部関数定義
	/**
	 * @proteced
	 */
	path.ExpGolomb.prototype.getData = function() {
		return this.value;
	};
	/**
	 * @protected
	 * @param val
	 */
	path.ExpGolomb.prototype.setData = function(val) {
		this.value = val;
		this.bits = [];
		var data = val;
		var bitCount = 0;
//		this.setBitCount(bitCount);
		for(var i = 0;data != 0;data >>>= 1, i ++) {
			this.bits.unshift(new com.ttProject.bit.Bit1(data & 0x01));
			bitCount ++;
		}
		var zeroCount = i - 1;
		for(;zeroCount >= 8;zeroCount -= 8) {
			this.bits.unshift(new com.ttProject.bit.Bit8());
			bitCount += 8;
		}
		bitCount += zeroCount;
		switch(zeroCount) {
		case 1:
			this.bits.unshift(new com.ttProject.bit.Bit1());
			break;
		case 2:
			this.bits.unshift(new com.ttProject.bit.Bit2());
			break;
		case 3:
			this.bits.unshift(new com.ttProject.bit.Bit3());
			break;
		case 4:
			this.bits.unshift(new com.ttProject.bit.Bit4());
			break;
		case 5:
			this.bits.unshift(new com.ttProject.bit.Bit5());
			break;
		case 6:
			this.bits.unshift(new com.ttProject.bit.Bit6());
			break;
		case 7:
			this.bits.unshift(new com.ttProject.bit.Bit7());
			break;
		default:
			break;
		}
		this.setBitCount(bitCount);
	};
	/**
	 * bitを登録していききます。
	 * @param bit bit1データ
	 * @reutrn false:登録がおわった場合 true:まだ登録が必要な場合
	 */
	path.ExpGolomb.prototype.addBit1 = function(bit) {
		if(!this.find1Flg) {
			if(bit.get() == 0) {
				this.zeroCount ++;
			}
			else {
				// みつけた
				this.find1Flg = true;
				this.value = 1;
			}
		}
		else {
			this.value = (this.value << 1) | bit.get();
			this.zeroCount --;
		}
		var end = zeroCount == 0;
		if(end) {
			setData(this.value);
		}
		return !end;
	};
	path.ExpGolomb.prototype.toString = function() {
		var data = "";
		for(var i = 0;i < this.bits.length;i ++) {
			var bit = this.bits[i];
			data += bit.toString();
		}
		return data;
	};
})(com.ttProject.bit.super);
