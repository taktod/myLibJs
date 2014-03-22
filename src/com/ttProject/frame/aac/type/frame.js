goog.provide("com.ttProject.frame.aac.type.Frame");

goog.require("com.ttProject.frame.aac.AacFrame");
goog.require("com.ttProject.frame.aac.DecoderSpecificInfo");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.BitConnector");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit11");
goog.require("com.ttProject.bit.Bit12");
goog.require("com.ttProject.bit.Bit13");
goog.require("com.ttProject.util.ArrayUtil");

/**
 * aacの音声部分の実体
 * @constructor
 */
com.ttProject.frame.aac.type.Frame = function() {
	goog.base(this);
	this._syncBit                      = new com.ttProject.bit.Bit12(0x0FFF);
	this._id                           = new com.ttProject.bit.Bit1();
	this._layer                        = new com.ttProject.bit.Bit2();
	this._protectionAbsent             = new com.ttProject.bit.Bit1(1);
	this._profile                      = new com.ttProject.bit.Bit2(); // -1した値がはいっているみたい。
	this._samplingFrequenceIndex       = new com.ttProject.bit.Bit4(4);
	this._privateBit                   = new com.ttProject.bit.Bit1(1);
	this._channelConfiguration         = new com.ttProject.bit.Bit3(2);
	this._originalFlg                  = new com.ttProject.bit.Bit1(1);
	this._home                         = new com.ttProject.bit.Bit1();
	this._copyrightIdentificationBit   = new com.ttProject.bit.Bit1();
	this._copyrightIdentificationStart = new com.ttProject.bit.Bit1();
	this._frameSize                    = new com.ttProject.bit.Bit13(0);
	this._adtsBufferFullness           = new com.ttProject.bit.Bit11(0x7FF);
	this._noRawDataBlocksInFrame       = new com.ttProject.bit.Bit2();
	this._rawBuffer = null;
};

goog.inherits(com.ttProject.frame.aac.type.Frame, com.ttProject.frame.aac.AacFrame);

/**
 * decoderSpecificInfoをベースに動作させます。
 * minimumLoadの替わりに使います。
 */
com.ttProject.frame.aac.type.Frame.prototype.loadDecoderSpecificInfo = function(size, dsi, channel, callback) {
	this._frameSize.set(7 + size);
	this._profile.set(dsi.getObjectType() - 1);
	this._samplingFrequenceIndex.set(dsi.getFrequencyIndex());
	this._channelConfiguration.set(dsi.getChannelConfiguration());
	this.setSize(7 + size);
	this.updateFlagData();
	callback();
};

com.ttProject.frame.aac.type.Frame.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(this._syncBit, this._id, this._layer, this._protectionAbsent, this._profile,
			this._samplingFrequenceIndex, this._privateBit, this._channelConfiguration,
			this._originalFlg, this._home, this._copyrightIdentificationBit,
			this._copyrightIdentificationStart, this._frameSize, this._adtsBufferFullness,
			this._noRawDataBlocksInFrame, function() {
		_this.setSize(_this._frameSize.get());
		_this.updateFlagData();
		callback();
	});
};

com.ttProject.frame.aac.type.Frame.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getSize() - 7, function(data) {
		_this._rawBuffer = data;
		callback();
	});
};

com.ttProject.frame.aac.type.Frame.prototype.updateFlagData = function() {
	var sampleRateTable = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000];
	this.setSampleNum(1024);
	this.setChannels(this._channelConfiguration.get());
	this.setSampleRate(sampleRateTable[this._samplingFrequenceIndex.get()]);
};

com.ttProject.frame.aac.type.Frame.prototype.getDecoderSpecificInfo = function() {
	var dsi = new com.ttProject.frame.aac.DecoderSpecificInfo();
	dsi.setObjectType(this._profile.get() + 1);
	dsi.setFrequencyIndex(this._samplingFrequenceIndex.get(), 0);
	dsi.setChannelConfiguration(this._channelConfiguration.get());
	return dsi;
};

com.ttProject.frame.aac.type.Frame.prototype.getData = function() {
	var connector = new com.ttProject.bit.BitConnector();
	return com.ttProject.util.ArrayUtil.connect(
			connector.connect(
					this._syncBit,
					this._id,
					this._layer,
					this._protectionAbsent,
					this._profile,
					this._samplingFrequenceIndex,
					this._privateBit,
					this._channelConfiguration,
					this._originalFlg,
					this._home,
					this._copyrightIdentificationBit,
					this._copyrightIdentificationStart,
					this._frameSize,
					this._adtsBufferFullness,
					this._noRawDataBlocksInFrame
			),
			this._rawBuffer
	);
};