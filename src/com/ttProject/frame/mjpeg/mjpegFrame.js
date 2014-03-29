goog.provide("com.ttProject.frame.mjpeg.MjpegFrame");

goog.require("com.ttProject.frame.base.VideoFrame");

/**
 * mjpegFrameのベース
 * @constructor
 */
com.ttProject.frame.mjpeg.MjpegFrame = function() {
	goog.base(this);
};

goog.inherits(com.ttProject.frame.mjpeg.MjpegFrame, com.ttProject.frame.base.VideoFrame);
