goog.provide("com.ttProject.frame.aac.AacDsiFrameAnalyzer");

goog.require("com.ttProject.frame.super.IAnalyzer");
goog.require("com.ttProject.frame.aac.AacDsiFrameSelector");
goog.require("com.ttProject.frame.aac.AacFrame");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacDsiFrameAnalyzer = function() {
	this._selector = new com.ttProject.frame.aac.AacDsiFrameSelector();
};

goog.inherits(com.ttProject.frame.aac.AacDsiFrameAnalyzer, com.ttProject.frame.super.IAnalyzer);

com.ttProject.frame.aac.AacDsiFrameAnalyzer.prototype.analyze = function(channel, callback) {
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

com.ttProject.frame.aac.AacDsiFrameAnalyzer.prototype.getSelector = function() {
	return this._selector;
};
