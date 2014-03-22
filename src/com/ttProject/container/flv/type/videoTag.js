goog.provide("com.ttProject.container.flv.type.VideoTag");

goog.require("com.ttProject.container.flv.VideoCodecType");
goog.require("com.ttProject.container.flv.FlvTag");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit24");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.frame.h264.ConfigData");
goog.require("com.ttProject.channel.Uint8ReadChannel");

/**
 * @constructor
 */
com.ttProject.container.flv.type.VideoTag = function(tagByte) {
	if(tagByte == undefined) {
		tagByte = new com.ttProject.bit.Bit8(0x09);
	}
	goog.base(this, tagByte);
	
	this._frameType = new com.ttProject.bit.Bit4();
	this._codecId = new com.ttProject.bit.Bit4();
	// vp6用
//	this._horizontalAdjustment = null;
//	this._verticalAdjustment = null;
	// vp6a用
//	this._offsetToAlpha = null;
	// avc用
	this._packetType = null;
	this._dts = null;
	// フレームデータ実体
	this._frameBuffer = null;
	// フレーム
	this._frame = null;
	// フレームの解析オブジェクト
	this._frameAnalyzer = null;
};

goog.inherits(com.ttProject.container.flv.type.VideoTag, com.ttProject.container.flv.FlvTag);

com.ttProject.container.flv.type.VideoTag.prototype.setFrameAnalyzer = function(analyzer) {
	this._frameAnalyzer = analyzer;
};

com.ttProject.container.flv.type.VideoTag.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	goog.base(this, "minimumLoad", channel, function() {
		if(_this.getSize() == 15) {
			// 内部データのないデータなので、処理できない。
			callback(null);
			return;
		}
		var loader = new com.ttProject.bit.BitLoader(channel);
		loader.load(_this._frameType, _this._codecId, function() {
			switch(_this._codecId.get()) {
			case com.ttProject.container.flv.VideoCodecType.H264:
				_this._packetType = new com.ttProject.bit.Bit8();
				_this._dts = new com.ttProject.bit.Bit24();
				loader.load(_this._packetType, _this._dts, function() {
					callback();
				});
				break;
			default:
				throw new Error("h264以外のコーデックは処理しません。");
			}
		});
		// 続きを読み込む
	});
};

com.ttProject.container.flv.type.VideoTag.prototype.load = function(channel, callback) {
	if(this._codecId == null) {
		// codecIdが決まらないということはデータのないvideoTagだった可能性があるので、そのままスルーします。
		callback();
		return;
	}
	var _this = this;
	switch(this._codecId.get()) {
	case com.ttProject.container.flv.VideoCodecType.H264:
		// h264の場合
		// bufferデータを読み込んで保持します。
		// packetTypeが0の場合はmshなので、MSHデータを読み込んでおきます。
		// データサイズがなければ、そのままおわらせる。
		if(this.getSize() - 16 - 4 == 0) {
			channel.read(4, function(data) {
				callback();
			});
			return;
		}
		channel.read(this.getSize() - 16 - 4, function(data) {
			_this._frameBuffer = data;
			// 必要があればframeAnalyzerを実施しておく。
			if(_this._packetType.get() == 0) {
				// mshデータなので、configDataを取得しておく。
				if(_this._frameAnalyzer == null || !(_this._frameAnalyzer instanceof com.ttProject.frame.h264.DataNalAnalyzer)) {
					throw new Error("h264解析用のanalyzerが設定されていないので、続行不能です。");
				}
				var configData = new com.ttProject.frame.h264.ConfigData();
				configData.setSelector(_this._frameAnalyzer.getSelector());
				// この部分のchannelはdataからつくらないとだめ
				configData.getNalsFrame(new com.ttProject.channel.Uint8ReadChannel(_this._frameBuffer), function() {
					channel.read(4, function(data) {
						callback();
					});
				});
			}
			else {
				_this._frameAnalyzer.analyze(new com.ttProject.channel.Uint8ReadChannel(_this._frameBuffer), function(frame) {
					// この部分でframeの読み込みをやっちゃう。
					channel.read(4, function(data) {
						callback();
					});
				});
			}
		});
		break;
	default:
		throw new Error("h264以外は処理しません。");
	}
};

/**
 * コーデックID(flv規定)を応答します。
 * @returns
 */
com.ttProject.container.flv.type.VideoTag.prototype.getCodec = function() {
	if(this._codecId == null) {
		return null;
	}
	return this._codecId.get();
};