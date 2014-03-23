goog.provide("com.ttProject.frame.mp3.Mp3FrameAnalyzer");

goog.require("com.ttProject.frame.base.IAnalyzer");
goog.require("com.ttProject.frame.mp3.Mp3FrameSelector");
goog.require("com.ttProject.frame.mp3.Mp3Frame");

/**
 * @constructor
 */
com.ttProject.frame.mp3.Mp3FrameAnalyzer = function() {
	this._selector = new com.ttProject.frame.mp3.Mp3FrameSelector();
};

goog.inherits(com.ttProject.frame.mp3.Mp3FrameAnalyzer, com.ttProject.frame.base.IAnalyzer);

/**
 * フレームを解析して取り出す
 * @param channel
 */
com.ttProject.frame.mp3.Mp3FrameAnalyzer.prototype.analyze = function(channel, callback) {
	this._selector.select(channel, function(frame){
		if(frame instanceof com.ttProject.frame.mp3.Mp3Frame) {
			frame.load(channel, function() {
				callback(frame);
			});
		}
		else {
			callback(frame);
		}
	});
};
