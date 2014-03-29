goog.provide("com.ttProject.frame.mjpeg.MjpegFrameAnalyzer");

goog.require("com.ttProject.frame.base.IAnalyzer");
goog.require("com.ttProject.frame.mjpeg.MjpegFrame");
goog.require("com.ttProject.frame.mjpeg.MjpegFrameSelector");

/**
 * @constructor
 */
com.ttProject.frame.mjpeg.MjpegFrameAnalyzer = function() {
	this._selector = new com.ttProject.frame.mjpeg.MjpegFrameSelector();
};

goog.inherits(com.ttProject.frame.mjpeg.MjpegFrameAnalyzer, com.ttProject.frame.base.IAnalyzer);

com.ttProject.frame.mjpeg.MjpegFrameAnalyzer.prototype.analyze = function(channel, callback) {
	this._selector.select(channel, function(frame) {
		if(frame instanceof com.ttProject.frame.mjpeg.MjpegFrame) {
			frame.load(channel, function() {
				callback(frame);
			});
		}
		else {
			callback(frame);
		}
	});
};

com.ttProject.frame.mjpeg.MjpegFrameAnalyzer.prototype.getSelector = function() {
	return this._selector;
};
