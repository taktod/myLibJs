goog.provide("com.ttProject.frame.mjpeg.type.Frame");

goog.require("com.ttProject.frame.mjpeg.MjpegFrame");

/**
 * Frame
 * @constructor
 */
com.ttProject.frame.mjpeg.type.Frame = function() {
	goog.base(this);
};

goog.inherits(com.ttProject.frame.mjpeg.type.Frame, com.ttProject.frame.mjpeg.MjpegFrame);

com.ttProject.frame.mjpeg.type.Frame.prototype.minimumLoad = function(channel, callback) {
	// 縦横データくらい解析しておいた方がいいのかな？
	// とりあえず面倒なので、selectorかreaderで設定してもらうか・・・
};
