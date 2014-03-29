goog.provide("com.ttProject.frame.mjpeg.MjpegFrameSelector");

goog.require("com.ttProject.frame.mjpeg.type.Frame");
goog.require("com.ttProject.frame.base.VideoSelector");

/**
 * @constructor
 */
com.ttProject.frame.mjpeg.MjpegFrameSelector = function() {
	goog.base(this);
};

goog.inherits(com.ttProject.frame.mjpeg.MjpegFrameSelector, com.ttProject.frame.base.VideoSelector);

com.ttProject.frame.mjpeg.MjpegFrameSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	// 内容を解析したいところだけど、中身はmjpegFrameってきまってる。
	var frame = new com.ttProject.frame.mjpeg.type.Frame();
	this.setup(frame);
	frame.minimumLoad(channel, function() {
		callback(frame);
	});
};
