goog.provide("com.ttProject.frame.mp3.Mp3Analyzer");

goog.require("com.ttProject.frame.super.IAnalyzer");
goog.require("com.ttProject.frame.mp3.Mp3Selector");
goog.require("com.ttProject.frame.mp3.Mp3Frame");

/**
 * @constructor
 */
com.ttProject.frame.mp3.Mp3Analyzer = function() {
	this._selector = new com.ttProject.frame.mp3.Mp3Selector();
};

goog.inherits(com.ttProject.frame.mp3.Mp3Analyer, com.ttProject.frame.super.IAnalyzer);

/**
 * フレームを解析して取り出す
 * @param channel
 */
com.ttProject.frame.mp3.Mp3Analyzer.prototype.analyzer = function(channel, callback) {
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
