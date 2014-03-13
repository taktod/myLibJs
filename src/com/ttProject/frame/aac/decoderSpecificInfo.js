goog.provide("com.ttProject.frame.aac.DecoderSpecificInfo");

goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit6");
goog.require("com.ttProject.bit.Bit24");

/**
 * @constructor
 */
com.ttProject.frame.aac.DecoderSpecificInfo = function() {
	this._objectType1          = new com.ttProject.bit.Bit5(); // profileの事
	this._objectType2          = null; // objectTypeが31の場合 // bit6
	this._frequencyIndex       = new com.ttProject.bit.Bit4(); // samplingFrequenceIndexと同じ
	this._frequency            = null; // indexが15の場合 // bit24
	this._channelConfiguration = new com.ttProject.bit.Bit4();
	this._fillBit              = null;
};

/**
 * 最低限読み込みを実施する
 */
com.ttProject.frame.aac.DecoderSpecificInfo.prototype.minimumLoad = function() {
	
};

/**
 * 全体読み込みを実施する。
 */
com.ttProject.frame.aac.DecoderSpecificInfo.prototype.load = function() {
	// minimumLoadですべて読み込むのでやることなし
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.getObjectType = function() {
	if(this._objectType1.get() == 31) {
		return this._objectType2.get();
	}
	return this._objectType1.get();
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.getFrequencyIndex = function() {
	if(this._frequencyIndex.get() == 15) {
		return this._frequency.get();
	}
	return this._frequencyIndex.get();
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.getChannelConfiguration = function() {
	return this._channelConfiguration.get();
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.setObjectType = function(type) {
	if(type > 30) {
		this._objectType1.set(31);
		this._objectType2 = new com.ttProject.bit.Bit6(type);
	}
	else {
		this._objectType1.set(type);
		this._objectType2 = null;
	}
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.setFrequencyIndex = function(index, frequencyNum) {
	if(index > 14) {
		this._frequencyIndex.set(15);
		this._frequency = new Bit24(frequencyNum);
	}
	else {
		this._frequencyIndex.set(index);
		this._frequency = null;
	}
};

com.ttProject.frame.aac.DecoderSpecificInfo.prototype.setChannelConfiguration = function(channelConfig) {
	this._channelConfiguration.set(channelConfig);
};
