goog.provide("com.ttProject.frame.base.VideoFrame");

goog.require("com.ttProject.container.base.Unit");

/**
 * 音声の定義ベース
 * 今回はサンプル深度は必要なさそうなので(生のaudioDataを扱う予定がないため)
 * なしにしておきます。
 * @constructor
 */
com.ttProject.frame.base.VideoFrame = function() {
	goog.base(this);
	this._dts;
	this._width;
	this._height;
	this._isKeyFrame;
};

goog.inherits(com.ttProject.frame.base.VideoFrame, com.ttProject.container.base.Unit);

com.ttProject.frame.base.VideoFrame.prototype.setDts = function(dts) {
	this._dts = dts;
};

com.ttProject.frame.base.VideoFrame.prototype.getDts = function() {
	return this._dts;
};

com.ttProject.frame.base.VideoFrame.prototype.setWidth = function(width) {
	this._width = width;
};

com.ttProject.frame.base.VideoFrame.prototype.getWidth = function() {
	return this._width;
};

com.ttProject.frame.base.VideoFrame.prototype.setHeight = function(height) {
	this._height = height;
};

com.ttProject.frame.base.VideoFrame.prototype.getHeight = function() {
	return this._height;
};

com.ttProject.frame.base.VideoFrame.prototype.setKeyFrame = function(flg) {
	this._isKeyFrame = flg;
};

com.ttProject.frame.base.VideoFrame.prototype.isKeyFrame = function() {
	return this._isKeyFrame;
};
