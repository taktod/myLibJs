goog.provide(com.ttProject.frame.super.AudioFrame);

goog.require(com.ttProject.container.super.Unit);

/**
 * 音声の定義ベース
 * 今回はサンプル深度は必要なさそうなので(生のaudioDataを扱う予定がないため)
 * なしにしておきます。
 * @constructor
 */
com.ttProject.frame.super.AudioFrame = function() {
	this._sampleNum;
	this._sampleRate;
	this._channels;
};

goog.inherits(com.ttProject.frame.super.AudioFrame, com.ttProject.container.super.Unit);

com.ttProject.frame.super.AudioFrame.prototype.setSampleNum = function(sampleNum) {
	this._sampleNum = sampleNum;
};

com.ttProject.frame.super.AudioFrame.prototype.getSampleNum = function() {
	return this._sampleNum;
};

com.ttProject.frame.super.AudioFrame.prototype.setSampleRate = function(sampleRate) {
	this._sampleRate = sampleRate;
};

com.ttProject.frame.super.AudioFrame.prototype.getSampleRate = function() {
	return this._sampleRate;
};

com.ttProject.frame.super.AudioFrame.prototype.setChannels = function(channels) {
	this._channels = channels;
};

com.ttProject.frame.super.AudioFrame.prototype.getChannels = function() {
	return this._channels;
};
