goog.provide("com.ttProject.container.mkv.type.TrackEntry");

goog.require("com.ttProject.container.mkv.MkvMasterTag");
goog.require("com.ttProject.container.mkv.type.TrackNumber");
goog.require("com.ttProject.container.mkv.type.FlagLacing");
goog.require("com.ttProject.container.mkv.type.CodecID");
//goog.require(CodecPrivate); // まだ未実装(h264やaacで必要)
goog.require("com.ttProject.container.mkv.type.Video");
goog.require("com.ttProject.container.mkv.type.Audio");
goog.require("com.ttProject.container.mkv.type.TrackType");
//goog.require(ContentEncodings); // contentEncodingsも未実装(圧縮や暗号化のあるtrackの場合に必要)
goog.require("com.ttProject.frame.mp3.Mp3FrameAnalyzer");
goog.require("com.ttProject.frame.mjpeg.MjpegFrameAnalyzer");
goog.require("com.ttProject.container.mkv.type.PixelWidth");
goog.require("com.ttProject.container.mkv.type.PixelHeight");
goog.require("com.ttProject.container.mkv.type.SamplingFrequency");
goog.require("com.ttProject.container.mkv.type.Channels");
goog.require("com.ttProject.container.mkv.type.BitDepth");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TrackEntry = function(id, size) {
	goog.base(this, id, size);
	this._timebase = null; // 動作trackEntryのtimebase値
	this._lacingFlag = 0; // 内部データのlacing
	this._type = null; // メディアの種類

	// コーデック情報
	this._codecId = null;
	// 映像の設定
	this._pixelWidth  = null;
	this._pixelHeight = null;
	// 音声の設定
	this._channels          = null;
	this._samplingFrequency = null;
	this._bitDepth          = null;
	
	// 圧縮や暗号化がある場合の設定
	this._contentEncoding = null;
	// フレーム解析用のオブジェクト
	this._analyzer = null;
};

goog.inherits(com.ttProject.container.mkv.type.TrackEntry, com.ttProject.container.mkv.MkvMasterTag);

com.ttProject.container.mkv.type.TrackEntry.prototype.getFrameAnalyzer = function() {
	return this._analyzer;
};

/**
 * trackEntryの中身をセットアップしておく。
 * @param defaultTimebase
 */
com.ttProject.container.mkv.type.TrackEntry.prototype.setupEntry = function(defaultTimebase) {
	var _this = this;
	this._timebase = defaultTimebase;
	var trackNumber = null;
	var codecPrivate = null;
	// 中身を調整する。
	this.getTags().forEach(function(tag) {
		// タグの解析を実施
		if(tag instanceof com.ttProject.container.mkv.type.TrackNumber) {
			trackNumber = tag;
		}
		else if(tag instanceof com.ttProject.container.mkv.type.FlagLacing) {
			_this._lacingFlag = tag.getValue();
		}
		else if(tag instanceof com.ttProject.container.mkv.type.CodecID) {
			_this._codecId = tag;
		}
//		else if(tag instanceof CodecPrivate) {
//			
//		}
		else if(tag instanceof com.ttProject.container.mkv.type.Video) {
			// videoをsetupする
			tag.getTags().forEach(function(tag) {
				if(tag instanceof com.ttProject.container.mkv.type.PixelWidth) {
					_this._pixelWidth = tag.getValue();
				}
				if(tag instanceof com.ttProject.container.mkv.type.PixelHeight) {
					_this._pixelHeight = tag.getValue();
				}
			});
		}
		else if(tag instanceof com.ttProject.container.mkv.type.Audio) {
			// audioをsetupする
			tag.getTags().forEach(function(tag) {
				if(tag instanceof com.ttProject.container.mkv.type.SamplingFrequency) {
					_this._samplingFrequency = tag.getValue();
				}
				if(tag instanceof com.ttProject.container.mkv.type.Channels) {
					_this._channels = tag.getValue();
				}
				if(tag instanceof com.ttProject.container.mkv.type.BitDepth) {
					_this._bitDepth = tag.getValue();
				}
			});
		}
		else if(tag instanceof com.ttProject.container.mkv.type.TrackType) {
			_this._type = tag.getValue();
		}
//		else if(tag instanceof ContentEncodings) {
//			
//		}
	});
	if(trackNumber == null) {
		throw new Error("trackNumberが見つかりませんでした。");
	}
	// まずコーデックについて調査しておく。
	var codecName = this._codecId.getValue();
	if(codecName.indexOf("V_MPEG4") == 0) {
		// avcかも？
		if(codecName.indexOf("AVC") > 0) {
			// avc(h264)
			console.log("avc");
			throw new Error("avcの処理はまだ作成していません。");
		}
	}
	else if(codecName.indexOf("V_MJPEG") == 0) {
		// mjpeg決定(mjpeg2000とかかもしれないけど・・・)
		console.log("mjpeg");
		this._analyzer = new com.ttProject.frame.mjpeg.MjpegFrameAnalyzer();
	}
	else if(codecName.indexOf("A_AAC") == 0) {
		// aac
		console.log("aac");
		throw new Error("aacの処理はまだ作成していません。");
	}
	else if(codecName.indexOf("A_MPEG/L3") == 0) {
		// mp3
		console.log("mp3");
		this._analyzer = new com.ttProject.frame.mp3.Mp3FrameAnalyzer();
	}
	else {
		throw new Error("unknown codec:" + codecName);
	}
	// analyzerについて調整しておく。
	switch(this._type) {
	case 1: // video
		this._analyzer.getSelector().setWidth(this._pixelWidth);
		this._analyzer.getSelector().setHeight(this._pixelHeight);
		break;
	case 2: // audio
		this._analyzer.getSelector().setChannels(this._channels);
		this._analyzer.getSelector().setSampleRate(this._samplingFrequency);
		break;
	}
	return trackNumber.getValue();
};
