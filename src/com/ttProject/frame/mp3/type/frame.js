goog.provide("com.ttProject.frame.mp3.type.Frame");

goog.require("com.ttProject.frame.mp3.Mp3Frame");
goog.require("com.ttProject.util.ArrayUtil");
goog.require("com.ttProject.bit.BitConnector");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.Bit11");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");

/**
 * mp3の音声部分の実体
 * @constructor
 */
com.ttProject.frame.mp3.type.Frame = function() {
	goog.base(this);
	this._syncBit           = new com.ttProject.bit.Bit11();
	this._mpegVersion       = new com.ttProject.bit.Bit2();
	this._layer             = new com.ttProject.bit.Bit2();
	this._protectionBit     = new com.ttProject.bit.Bit1();
	this._bitrateIndex      = new com.ttProject.bit.Bit4();
	this._samplingRateIndex = new com.ttProject.bit.Bit2();
	this._paddingBit        = new com.ttProject.bit.Bit1();
	this._privateBit        = new com.ttProject.bit.Bit1();
	this._channelMode       = new com.ttProject.bit.Bit2();
	this._modeExtension     = new com.ttProject.bit.Bit2();
	this._copyRight         = new com.ttProject.bit.Bit1();
	this._originalFlag      = new com.ttProject.bit.Bit1();
	this._emphasis          = new com.ttProject.bit.Bit2();
	this._rawBuffer;
};

goog.inherits(com.ttProject.frame.mp3.type.Frame, com.ttProject.frame.mp3.Mp3Frame);

com.ttProject.frame.mp3.type.Frame.prototype.minimumLoad = function(channel, callback) {
//	console.log("minimumLoadを実施します。for frame");
	var sampleRateTable = [
	  [11025, 12000,  8000],
	  [   -1, -1000, -1000],
	  [22050, 24000, 16000],
	  [44100, 48000, 32000]
	];
	var _this = this;
	var syncBit = new com.ttProject.bit.Bit3();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(syncBit, this._mpegVersion, this._layer, this._protectionBit,
			this._bitrateIndex, this._samplingRateIndex, this._paddingBit, this._privateBit,
			this._channelMode, this._modeExtension, this._copyRight, this._originalFlag,
			this._emphasis,
			function() {
		var setSize = function() {
			switch(_this._layer.get()) {
			case 3: // layer1
				_this.setSize((Math.floor(12 * _this.getBitrate() / _this.getSampleRate() + _this._paddingBit.get())));
				break;
			case 2: // layer2
				_this.setSize((Math.floor(144 * _this.getBitrate() / _this.getSampleRate() + _this._paddingBit.get())));
				break;
			case 1: // layer3
				if(_this._mpegVersion.get() == 3) {
					_this.setSize((Math.floor(144 * _this.getBitrate() / _this.getSampleRate() + _this._paddingBit.get())));
				}
				else {
					_this.setSize((Math.floor(72 * _this.getBitrate() / _this.getSampleRate() + _this._paddingBit.get())));
				}
				break;
			default:
				throw new Error("layerの値が不正です。");
			}
		};
		var setSampleNum = function() {
			switch(_this._layer.get()) {
			case 3: // layey1
				_this.setSampleNum(384);
				break;
			case 2: // layer2
				_this.setSampleNum(1152);
				break;
			case 1: // layer3
				if(_this._mpegVersion.get() == 3) {
					// mpeg1
					_this.setSampleNum(1152);
				}
				else {
					// mpeg2 or mpeg2.5
					_this.setSampleNum(576);
				}
				break;
			default:
				throw new Error("layerの値が不正です。");
			}
		};
		_this._syncBit.set(0xFF << 3 | syncBit.get());
		// ここでsampleRate, sampleNum,  size, channelが決定する
		_this.setSampleRate(sampleRateTable[_this._mpegVersion.get()][_this._samplingRateIndex.get()]);
		setSampleNum();
		_this.setChannels(_this._channelMode.get() == 3 ? 1 : 2);
		setSize();
		callback();
	});
};

com.ttProject.frame.mp3.type.Frame.prototype.getBitrate = function() {
	var bitrateIndexV1L1  = [-1, 32000, 64000, 96000, 128000, 160000, 192000, 224000, 256000, 288000, 320000, 352000, 384000, 416000, 448000, -1];
	var bitrateIndexV1L2  = [-1, 32000, 48000, 56000,  64000,  80000,  96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000, 384000, -1];
	var bitrateIndexV1L3  = [-1, 32000, 40000, 48000,  56000,  64000,  80000,  96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000, -1];
	var bitrateIndexV2L1  = [-1, 32000, 48000, 56000,  64000,  80000,  96000, 112000, 128000, 144000, 160000, 176000, 192000, 224000, 256000, -1];
	var bitrateIndexV2L23 = [-1,  8000, 16000, 24000,  32000,  40000,  48000,  56000,  64000,  80000,  96000, 112000, 128000, 144000, 160000, -1];
	if(this._mpegVersion.get() == 0 || this._mpegVersion.get() == 2) {
		if(this._layer.get() == 3) {
			return bitrateIndexV2L1[this._bitrateIndex.get()];
		}
		else if(this._layer.get() == 2 || this._layer.get() == 1) {
			return bitrateIndexV2L23[this._bitrateIndex.get()];
		}
	}
	else if(this._mpegVersion.get() == 3) {
		switch(this._layer.get()) {
		case 1:
			return bitrateIndexV1L3[this._bitrateIndex.get()];
		case 2:
			return bitrateIndexV1L2[this._bitrateIndex.get()];
		case 3:
			return bitrateIndexV1L1[this._bitrateIndex.get()];
		default:
			throw new Error("layerの値が不正です。");
		}
	}
};

com.ttProject.frame.mp3.type.Frame.prototype.load = function(channel, callback) {
//	console.log("loadを実施します。 at frame");
	var _this = this;
	channel.read(this.getSize() - 4, function(data) {
		_this._rawBuffer = data;
		callback();
	});
};

/**
 * データを応答します。
 */
com.ttProject.frame.mp3.type.Frame.prototype.getData = function() {
	var connector = new com.ttProject.bit.BitConnector();
	return com.ttProject.util.ArrayUtil.connect(
			connector.connect(this._syncBit, this._mpegVersion, this._layer, this._protectionBit,
					this._bitrateIndex, this._samplingRateIndex, this._paddingBit, this._privateBit,
					this._channelMode, this._modeExtension, this._copyRight, this._originalFlag, this._emphasis),
			this._rawBuffer
	);
};