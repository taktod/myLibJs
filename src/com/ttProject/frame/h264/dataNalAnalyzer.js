goog.provide("com.ttProject.frame.h264.DataNalAnalyzer");

goog.require("com.ttProject.frame.super.IAnalyzer");
goog.require("com.ttProject.bit.Bit32");
goog.require("com.ttProject.frame.h264.H264FrameSelector");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.channel.Uint8ReadChannel");

/**
 * flvやmp4のdataNalの形式を解析します。
 * @constructor
 */
com.ttProject.frame.h264.DataNalAnalyzer = function() {
	/** 最終処理フレーム */
	this._frame = null;
	this._frameSelector = new com.ttProject.frame.h264.H264FrameSelector();
};

goog.inherits(com.ttProject.frame.h264.DataNalAnalyzer, com.ttProject.frame.super.IAnalyzer);

com.ttProject.frame.h264.DataNalAnalyzer.prototype.getSelector = function() {
	return this._frameSelector;
};

/**
 * 解析します。
 */
com.ttProject.frame.h264.DataNalAnalyzer.prototype.analyze = function(channel, callback) {
	if(channel.size() - channel.position() < 4) {
		throw new Error("読み込みバッファ量がおかしいです。");
	}
	var _this = this;
	var size = new com.ttProject.bit.Bit32();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(size, function() {
		// このサイズ分切り出して送る必要あり。
		channel.read(size.get(), function(data) {
			_this._frameSelector.select(new com.ttProject.channel.Uint8ReadChannel(data), function(frame) {
				console.log(frame);
			});
		});
	});
};
