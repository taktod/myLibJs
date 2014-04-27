goog.provide("com.ttProject.bit.EbmlValue");

goog.require("com.ttProject.bit.base.Bit");
goog.require("com.ttProject.bit.base.BitN");
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
 * @constructor
 */
com.ttProject.bit.EbmlValue = function() {
	goog.base(this, 0);
	this.numBit = new com.ttProject.bit.Bit1(1);
	this.dataBit = new com.ttProject.bit.Bit7();
	this.zeroCount = 0;
};

// 継承
goog.inherits(com.ttProject.bit.EbmlValue, com.ttProject.bit.base.Bit);

com.ttProject.bit.EbmlValue.prototype.getBitCount = function() {
	return this.numBit.getBitCount() + this.dataBit.getBitCount();
};

com.ttProject.bit.EbmlValue.prototype.get = function() {
	return this.dataBit.get();
};

com.ttProject.bit.EbmlValue.prototype.set = function(val) {
	if(val >>> 7 == 0) {
		this.numBit = new com.ttProject.bit.Bit1(1);
		this.dataBit = new com.ttProject.bit.Bit7(val);
	}
	else if(val >>> 14 == 0) {
		this.numBit = new com.ttProject.bit.Bit2(1);
		this.dataBit = new com.ttProject.bit.Bit14(val);
	}
	else if(val >>> 21 == 0) {
		this.numBit = new com.ttProject.bit.Bit3(1);
		this.dataBit = new com.ttProject.bit.Bit21(val);
	}
	else if(val >>> 28 == 0) {
		this.numBit = new com.ttProject.bit.Bit4(1);
		this.dataBit = new com.ttProject.bit.Bit28(val);
	}
	else if(val >>> 35 == 0) {
		this.numBit = new com.ttProject.bit.Bit5(1);
		this.dataBit = new com.ttProject.bit.Bit35(val);
	}
	else if(val >>> 42 == 0) {
		this.numBit = new com.ttProject.bit.Bit6(1);
		this.dataBit = new com.ttProject.bit.Bit42(val);
	}
	else if(val >>> 49 == 0) {
		this.numBit = new com.ttProject.bit.Bit7(1);
		this.dataBit = new com.ttProject.bit.Bit42(val);
	}
	else if(val >>> 56 == 0) {
		this.numBit = new com.ttProject.bit.Bit8(1);
		this.dataBit = new com.ttProject.bit.Bit56(val);
	}
	else {
		throw new Error("ebmlとして登録しようとしたデータが不正です。");
	}
};
com.ttProject.bit.EbmlValue.prototype.getEbmlValue = function() {
	return new com.ttProject.bit.base.BitN(this.numBit, this.dataBit).get();
};
com.ttProject.bit.EbmlValue.prototype.setEbmlValue = function(val) {
	if(val >>> 7 == 1) {
		this.numBit = new com.ttProject.bit.Bit1(1);
		this.dataBit = new com.ttProject.bit.Bit7(val & 0x7F);
	}
	else if(val >>> 14 == 1) {
		this.numBit = new com.ttProject.bit.Bit2(1);
		this.dataBit = new com.ttProject.bit.Bit14(val & 0x3FFF);
	}
	else if(val >>> 21 == 1) {
		this.numBit = new com.ttProject.bit.Bit3(1);
		this.dataBit = new com.ttProject.bit.Bit21(val & 0x1FFFFF);
	}
	else if(val >>> 28 == 1) {
		this.numBit = new com.ttProject.bit.Bit4(1);
		this.dataBit = new com.ttProject.bit.Bit28(val & 0x0FFFFFFF);
	}
	else if(val >>> 35 == 1) {
		this.numBit = new com.ttProject.bit.Bit5(1);
		this.dataBit = new com.ttProject.bit.Bit35(val & 0x07FFFFFFFF);
	}
	else if(val >>> 42 == 1) {
		this.numBit = new com.ttProject.bit.Bit6(1);
		this.dataBit = new com.ttProject.bit.Bit42(val & 0x03FFFFFFFFFF);
	}
	else if(val >>> 49 == 1) {
		this.numBit = new com.ttProject.bit.Bit7(1);
		this.dataBit = new com.ttProject.bit.Bit42(val & 0x01FFFFFFFFFFFF);
	}
	else if(val >>> 56 == 1) {
		this.numBit = new com.ttProject.bit.Bit8(1);
		this.dataBit = new com.ttProject.bit.Bit56(val & 0x00FFFFFFFFFFFFFF);
	}
	else {
		throw new Error("ebmlとして登録しようとしたデータが不正です。");
	}
};
com.ttProject.bit.EbmlValue.prototype.addBit1 = function(bit1) {
	if(bit1.get() == 1) {
		switch(this.zeroCount) {
		case 0: this.numBit = new com.ttProject.bit.Bit1(1);break;
		case 1: this.numBit = new com.ttProject.bit.Bit2(1);break;
		case 2: this.numBit = new com.ttProject.bit.Bit3(1);break;
		case 3: this.numBit = new com.ttProject.bit.Bit4(1);break;
		case 4: this.numBit = new com.ttProject.bit.Bit5(1);break;
		case 5: this.numBit = new com.ttProject.bit.Bit6(1);break;
		case 6: this.numBit = new com.ttProject.bit.Bit7(1);break;
		case 7: this.numBit = new com.ttProject.bit.Bit8(1);break;
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
com.ttProject.bit.EbmlValue.prototype.getDataBit = function() {
	switch(this.zeroCount) {
	case 0: this.dataBit = new com.ttProject.bit.Bit7();  break;
	case 1: this.dataBit = new com.ttProject.bit.Bit14(); break;
	case 2: this.dataBit = new com.ttProject.bit.Bit21(); break;
	case 3: this.dataBit = new com.ttProject.bit.Bit28(); break;
	case 4: this.dataBit = new com.ttProject.bit.Bit35(); break;
	case 5: this.dataBit = new com.ttProject.bit.Bit42(); break;
	case 6: this.dataBit = new com.ttProject.bit.Bit49(); break;
	case 7: this.dataBit = new com.ttProject.bit.Bit56(); break;
	default:
		throw new Error("ebmlとして不正なデータ");
	}
	return dataBit;
};
com.ttProject.bit.EbmlValue.prototype.getEbmlDataBit = function() {
	return this.dataBit;
};
com.ttProject.bit.EbmlValue.prototype.getEbmlNumBit = function() {
	return this.numBit;
};
com.ttProject.bit.EbmlValue.prototype.toString = function() {
	return this.numBit.toString() + this.dataBit.toString();
};
