goog.provide("com.ttProject.bit.EbmlValue");

goog.require("com.ttProject.bit.super.Bit");
goog.require("com.ttProject.bit.super.BitN");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit6");
goog.require("com.ttProject.bit.Bit7");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit14");
goog.require("com.ttProject.bit.Bit21");
goog.require("com.ttProject.bit.Bit28");
goog.require("com.ttProject.bit.Bit35");
goog.require("com.ttProject.bit.Bit42");
goog.require("com.ttProject.bit.Bit49");
goog.require("com.ttProject.bit.Bit56");

/**
 * mkvやwebmのebmlValueの定義
 */
(function(path){
	/**
	 * @constractor
	 */
	path.EbmlValue = function() {
		goog.base(this, 0);
		this.numBit = new path.Bit1(1);
		this.dataBit = new path.Bit7();
		this.zeroCount = 0;
	};
	// 継承
	goog.inherits(path.EbmlValue, path.super.Bit);
	path.EbmlValue.prototype.zeroCount;
	path.EbmlValue.prototype.numBit;
	path.EbmlValue.prototype.dataBit;
	path.EbmlValue.prototype.getCount = function() {
		return this.numBit.getBitCount() + this.dataBit.getBitCount();
	};
	path.EbmlValue.prototype.get = function() {
		return this.dataBit.get();
	};
	path.EbmlValue.prototype.set = function(val) {
		if(val >>> 7 == 0) {
			this.numBit = new path.Bit1(1);
			this.dataBit = new path.Bit7(val);
		}
		else if(val >>> 14 == 0) {
			this.numBit = new path.Bit2(1);
			this.dataBit = new path.Bit14(val);
		}
		else if(val >>> 21 == 0) {
			this.numBit = new path.Bit3(1);
			this.dataBit = new path.Bit21(val);
		}
		else if(val >>> 28 == 0) {
			this.numBit = new path.Bit4(1);
			this.dataBit = new path.Bit28(val);
		}
		else if(val >>> 35 == 0) {
			this.numBit = new path.Bit5(1);
			this.dataBit = new path.Bit35(val);
		}
		else if(val >>> 42 == 0) {
			this.numBit = new path.Bit6(1);
			this.dataBit = new path.Bit42(val);
		}
		else if(val >>> 49 == 0) {
			this.numBit = new path.Bit7(1);
			this.dataBit = new path.Bit42(val);
		}
		else if(val >>> 56 == 0) {
			this.numBit = new path.Bit8(1);
			this.dataBit = new path.Bit56(val);
		}
		else {
			throw new Error("ebmlとして登録しようとしたデータが不正です。");
		}
	};
	path.EbmlValue.prototype.getEbmlValue = function() {
		return new path.super.BitN(this.numBit, this.dataBit).get();
	};
	path.EbmlValue.prototype.setEbmlValue = function(val) {
		if(val >>> 7 == 1) {
			this.numBit = new path.Bit1(1);
			this.dataBit = new path.Bit7(val & 0x7F);
		}
		else if(val >>> 14 == 1) {
			this.numBit = new path.Bit2(1);
			this.dataBit = new path.Bit14(val & 0x3FFF);
		}
		else if(val >>> 21 == 1) {
			this.numBit = new path.Bit3(1);
			this.dataBit = new path.Bit21(val & 0x1FFFFF);
		}
		else if(val >>> 28 == 1) {
			this.numBit = new path.Bit4(1);
			this.dataBit = new path.Bit28(val & 0x0FFFFFFF);
		}
		else if(val >>> 35 == 1) {
			this.numBit = new path.Bit5(1);
			this.dataBit = new path.Bit35(val & 0x07FFFFFFFF);
		}
		else if(val >>> 42 == 1) {
			this.numBit = new path.Bit6(1);
			this.dataBit = new path.Bit42(val & 0x03FFFFFFFFFF);
		}
		else if(val >>> 49 == 1) {
			this.numBit = new path.Bit7(1);
			this.dataBit = new path.Bit42(val & 0x01FFFFFFFFFFFF);
		}
		else if(val >>> 56 == 1) {
			this.numBit = new path.Bit8(1);
			this.dataBit = new path.Bit56(val & 0x00FFFFFFFFFFFFFF);
		}
		else {
			throw new Error("ebmlとして登録しようとしたデータが不正です。");
		}
	};
	path.EbmlValue.prototype.addBit1 = function(bit1) {
		if(bit1.get() == 1) {
			switch(this.zeroCount) {
			case 0: this.numBit = new path.Bit1(1);break;
			case 1: this.numBit = new path.Bit2(1);break;
			case 2: this.numBit = new path.Bit3(1);break;
			case 3: this.numBit = new path.Bit4(1);break;
			case 4: this.numBit = new path.Bit5(1);break;
			case 5: this.numBit = new path.Bit6(1);break;
			case 6: this.numBit = new path.Bit7(1);break;
			case 7: this.numBit = new path.Bit8(1);break;
			default:
				throw new Error("ebmlとして不正なデータです。");
			}
			return false;
		}
		else {
			this.zeroCount ++;
		}
		return true;
	};
	path.EbmlValue.prototype.getDataBit = function() {
		switch(this.zeroCount) {
		case 0: this.dataBit = new path.Bit7();  break;
		case 1: this.dataBit = new path.Bit14(); break;
		case 2: this.dataBit = new path.Bit21(); break;
		case 3: this.dataBit = new path.Bit28(); break;
		case 4: this.dataBit = new path.Bit35(); break;
		case 5: this.dataBit = new path.Bit42(); break;
		case 6: this.dataBit = new path.Bit49(); break;
		case 7: this.dataBit = new path.Bit56(); break;
		default:
			throw new Error("ebmlとして不正なデータ");
		}
		return this.dataBit;
	};
	path.EbmlValue.prototype.getEbmlDataBit = function() {
		return this.dataBit;
	};
	path.EbmlValue.prototype.getEbmlNumBit = function() {
		return this.numBit;
	};
	path.EbmlValue.prototype.toString = function() {
		return this.numBit.toString() + this.dataBit.toString();
	};
})(com.ttProject.bit);