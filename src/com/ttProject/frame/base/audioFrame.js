goog.provide("com.ttProject.frame.base.AudioFrame");

goog.require("com.ttProject.container.base.Unit");

/**
 * 音声の定義ベース
 * 今回はサンプル深度は必要なさそうなので(生のaudioDataを扱う予定がないため)
 * なしにしておきます。
 * @constructor
 */
com.ttProject.frame.base.AudioFrame = function() {
	goog.base(this);
	this._sampleNum = null;
	this._sampleRate = null;
	this._channels = null;
	this._id = null;
};

goog.inherits(com.ttProject.frame.base.AudioFrame, com.ttProject.container.base.Unit);

com.ttProject.frame.base.AudioFrame.prototype.setSampleNum = function(sampleNum) {
	this._sampleNum = sampleNum;
};

com.ttProject.frame.base.AudioFrame.prototype.getSampleNum = function() {
	return this._sampleNum;
};

com.ttProject.frame.base.AudioFrame.prototype.setSampleRate = function(sampleRate) {
	this._sampleRate = sampleRate;
};

com.ttProject.frame.base.AudioFrame.prototype.getSampleRate = function() {
	return this._sampleRate;
};

com.ttProject.frame.base.AudioFrame.prototype.setChannels = function(channels) {
	this._channels = channels;
};

com.ttProject.frame.base.AudioFrame.prototype.getChannels = function() {
	return this._channels;
};

com.ttProject.frame.base.AudioFrame.prototype.setId = function(id) {
	this._id = id;
};

com.ttProject.frame.base.AudioFrame.prototype.getId = function() {
	return this._id;
};
