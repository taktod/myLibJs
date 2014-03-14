goog.provide("com.ttProject.frame.aac.AacFrameAnalyzer");

goog.require("com.ttProject.frame.super.IAnalyzer");
goog.require("com.ttProject.frame.aac.AacFrameSelector");
goog.require("com.ttProject.frame.aac.AacFrame");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacFrameAnalyzer = function() {
	this._selector = new com.ttProject.frame.aac.AacFrameSelector();
};

goog.inherits(com.ttProject.frame.aac.AacFrameAnalyzer, com.ttProject.frame.super.IAnalyzer);

com.ttProject.frame.aac.AacFrameAnalyzer.prototype.analyzer = function(channel, callback) {
	this._selector.select(channel, function(frame) {
		if(frame instanceof com.ttProject.frame.aac.AacFrame) {
			frame.load(channel, function() {
				callback(frame);
			});
		}
		else {
			callback(frame);
		}
	});
};