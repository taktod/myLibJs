goog.provide("com.ttProject.frame.super.VideoFrame");

goog.require("com.ttProject.container.super.Unit");

/**
 * 音声の定義ベース
 * 今回はサンプル深度は必要なさそうなので(生のaudioDataを扱う予定がないため)
 * なしにしておきます。
 * @constructor
 */
com.ttProject.frame.super.VideoFrame = function() {
	this._dts;
	this._width;
	this._height;
	this._isKeyFrame;
};

goog.inherits(com.ttProject.frame.super.VideoFrame, com.ttProject.container.super.Unit);

com.ttProject.frame.super.VideoFrame.prototype.setDts = function(dts) {
	this._dts = dts;
};

com.ttProject.frame.super.VideoFrame.prototype.getDts = function() {
	return this._dts;
};

com.ttProject.frame.super.VideoFrame.prototype.setWidth = function(width) {
	this._width = width;
};

com.ttProject.frame.super.VideoFrame.prototype.getWidth = function() {
	return this._width;
};

com.ttProject.frame.super.VideoFrame.prototype.setHeight = function(height) {
	this._height = height;
};

com.ttProject.frame.super.VideoFrame.prototype.getHeight = function() {
	return this._height;
};

com.ttProject.frame.super.VideoFrame.prototype.setKeyFrame = function(flg) {
	this._isKeyFrame = flg;
};

com.ttProject.frame.super.VideoFrame.prototype.isKeyFrame = function() {
	return this._isKeyFrame;
};
