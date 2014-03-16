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
 * h264で利用するExpGolomb定義
 */
/**
 * @constructor
 */
com.ttProject.bit.super.ExpGolomb = function() {
	// 初期化として0を表現しておきます。
	goog.base(this, 1);
	this._value = 0;
	this._zeroCount = 0;
	this._find1Flg = false;
	this._bits = [new com.ttProject.bit.Bit1(1)];
};
// 継承しとく
goog.inherits(com.ttProject.bit.super.ExpGolomb, com.ttProject.bit.super.Bit);
// 内部関数定義
/**
 * @proteced
 */
com.ttProject.bit.super.ExpGolomb.prototype.getData = function() {
	return this._value;
};
/**
 * @protected
 * @param val
 */
com.ttProject.bit.super.ExpGolomb.prototype.setData = function(val) {
	this._value = val;
	this._bits = [];
	var data = val;
	var bitCount = 0;
//		this.setBitCount(bitCount);
	for(var i = 0;data != 0;data >>>= 1, i ++) {
		this._bits.unshift(new com.ttProject.bit.Bit1(data & 0x01));
		bitCount ++;
	}
	var _zeroCount = i - 1;
	for(;_zeroCount >= 8;_zeroCount -= 8) {
		this._bits.unshift(new com.ttProject.bit.Bit8());
		bitCount += 8;
	}
	bitCount += _zeroCount;
	switch(_zeroCount) {
	case 1:
		this._bits.unshift(new com.ttProject.bit.Bit1());
		break;
	case 2:
		this._bits.unshift(new com.ttProject.bit.Bit2());
		break;
	case 3:
		this._bits.unshift(new com.ttProject.bit.Bit3());
		break;
	case 4:
		this._bits.unshift(new com.ttProject.bit.Bit4());
		break;
	case 5:
		this._bits.unshift(new com.ttProject.bit.Bit5());
		break;
	case 6:
		this._bits.unshift(new com.ttProject.bit.Bit6());
		break;
	case 7:
		this._bits.unshift(new com.ttProject.bit.Bit7());
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
com.ttProject.bit.super.ExpGolomb.prototype.addBit1 = function(bit) {
	if(!this._find1Flg) {
		if(bit.get() == 0) {
			this._zeroCount ++;
		}
		else {
			// みつけた
			this._find1Flg = true;
			this._value = 1;
		}
	}
	else {
		this._value = (this._value << 1) | bit.get();
		this._zeroCount --;
	}
	var end = this._zeroCount == 0;
	if(end) {
		this.setData(this._value);
	}
	return !end;
};
com.ttProject.bit.super.ExpGolomb.prototype.toString = function() {
	var data = "";
	for(var i = 0;i < this._bits.length;i ++) {
		var bit = this._bits[i];
		data += bit.toString();
	}
	return data;
};
