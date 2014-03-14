goog.provide("com.ttProject.frame.aac.DecoderSpecificInfo");

goog.require("com.ttProject.bit.BitLoader");
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
com.ttProject.frame.aac.DecoderSpecificInfo.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	var loadChannelConfiguration = function() {
		loader.load(_this._channelConfiguration, function() {
			// 残りのbitデータをfillBitに記録しておく。
			loader.getExtraBit(function(bit) {
				_this._fillBit = bit;
				callback(_this);
			});
		});
	};
	var loadFrequency = function() {
		if(_this._frequencyIndex.get() == 15) {
			_this._frequency = new com.ttProject.bit.Bit24();
			loader.load(_this._frequency, loadChannelConfiguration);
		}
		else {
			loadChannelConfiguration();
		}
	};
	var loadFrequencyIndex = function() {
		loader.load(_this._frequencyIndex, loadFrequency);
	};
	var loadObjectType2 = function() {
		if(_this._objectType1.get() == 31) {
			// objectType2が必要
			_this._objectType2 = new com.ttProject.bit.Bit6();
			loader.load(_this._objectType2, loadFrequencyIndex);
		}
		else {
			loadFrequencyIndex();
		}
	};
	var loadObjectType1 = function() {
		loader.load(this._objectType1, loadObjectType2);
	};
	loadObjectType1();
};

/**
 * 全体読み込みを実施する。
 */
com.ttProject.frame.aac.DecoderSpecificInfo.prototype.load = function(channel, callback) {
	// minimumLoadですべて読み込むのでやることなし
	callback();
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
