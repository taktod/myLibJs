goog.provide("com.ttProject.frame.mp3.Mp3FrameSelector");

goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.BitLoader");

/**
 * @constructor
 */
com.ttProject.frame.mp3.Mp3FrameSelector = function() {
	
};

com.ttProject.frame.mp3.Mp3FrameSelector.prototype.select = function(channel, callback) {
	// まず始めの8bitを読み込んでみる。
	var firstByte = new com.ttProject.bit.Bit8();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(firstByte, function() {
		// 読み込みがおわったときの処理
		// firstByteからframeTypeを選択
	});
};