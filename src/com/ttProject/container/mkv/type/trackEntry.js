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

/**
 * trackEntryの中身をセットアップしておく。
 * @param defaultTimebase
 */
com.ttProject.container.mkv.type.TrackEntry.prototype.setupEntry = function(defaultTimebase) {
	var _this = this;
	this._timebase = defaultTimebase;
	// 中身を調整する。
	this.getTags.forEach(function(tag) {
		// タグの解析を実施
		console.log(tag);
		
	});
};
