goog.provide("com.ttProject.container.flv.type.AudioTag");

goog.require("com.ttProject.container.flv.AudioCodecType");
goog.require("com.ttProject.container.flv.FlvTag");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.frame.aac.DecoderSpecificInfo");
goog.require("com.ttProject.channel.Uint8ReadChannel");

/**
 * @constructor
 */
com.ttProject.container.flv.type.AudioTag = function(tagByte) {
	if(tagByte == undefined) {
		tagByte = new com.ttProject.bit.Bit8(0x08);
	}
	goog.base(this, tagByte);
	this._codecId = new com.ttProject.bit.Bit4();
	this._sampleRate = new com.ttProject.bit.Bit2();
	this._bitCount = new com.ttProject.bit.Bit1();
	this._channels = new com.ttProject.bit.Bit1();
	// aac用
	this._sequenceHeaderFlag = null;
	
	this._frameBuffer = null;
	this._frame = null;
	this._frameAnalyzer = null;
};

goog.inherits(com.ttProject.container.flv.type.AudioTag, com.ttProject.container.flv.FlvTag);

com.ttProject.container.flv.type.AudioTag.prototype.setFrameAnalyzer = function(analyzer) {
	this._frameAnalyzer = analyzer;
};

com.ttProject.container.flv.type.AudioTag.prototype.getCodec = function() {
	if(this._codecId == null) {
		return null;
	}
	return this._codecId.get();
};

com.ttProject.container.flv.type.AudioTag.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	goog.base(this, "minimumLoad", channel, function() {
		var loader = new com.ttProject.bit.BitLoader(channel);
		loader.load(_this._codecId, _this._sampleRate, _this._bitCount, _this._channels,
				function() {
			switch(_this._codecId.get()) {
			case com.ttProject.container.flv.AudioCodecType.AAC:
				// sequenceHeaderFlagを読み込む必要あり。
				_this._sequenceHeaderFlag = new com.ttProject.bit.Bit8();
				loader.load(_this._sequenceHeaderFlag, callback);
				return;
			case com.ttProject.container.flv.AudioCodecType.MP3:
				console.log("mp3");
				break;
			case com.ttProject.container.flv.AudioCodecType.MP3_8:
				console.log("mp3_8");
				break;
			default:
				throw new Error("エラー発生");
			}
			callback();
		});
	});
};

com.ttProject.container.flv.type.AudioTag.prototype.load = function(channel, callback) {
	if(this._codecId == null) {
		// codecIdが決まらないということはデータのないvideoTagだった可能性があるので、そのままスルーします。
		callback();
		return;
	}
	var _this = this;
	switch(this._codecId.get()) {
	case com.ttProject.container.flv.AudioCodecType.AAC:
		channel.read(this.getSize() - 13 - 4, function(data) {
			_this._frameBuffer = data;
			if(_this._sequenceHeaderFlag.get() == 0) {
				if(_this._frameAnalyzer == null || !(_this._frameAnalyzer instanceof com.ttProject.frame.aac.AacDsiFrameAnalyzer)) {
					throw new Error("frameAnalyzerがaac(dsi)対応ではないみたいです。");
				}
				var dsi = new com.ttProject.frame.aac.DecoderSpecificInfo();
				dsi.minimumLoad(new com.ttProject.channel.Uint8ReadChannel(_this._frameBuffer), function() {
					// dsi読み込んだ
					_this._frameAnalyzer.getSelector().setDecoderSpecificInfo(dsi);
					channel.read(4, function(data){
						callback();
					});
				});
			}
			else {
				console.log("ここでおわっちゃう。");
				channel.read(4, function(data){
//					callback();
				});
			}
		});
		break;
	case com.ttProject.container.flv.AudioCodecType.MP3:
	case com.ttProject.container.flv.AudioCodecType.MP3_8:
		channel.read(this.getSize() - 12 - 4, function(data) {
			_this._frameBuffer = data;
			channel.read(4, function(data){
				callback();
			});
		});
		break;
	default:
		throw new Error("エラー発生");
	}
};