goog.provide("com.ttProject.frame.base.AudioSelector");

/**
 * @constructor
 */
com.ttProject.frame.base.AudioSelector = function(){
	this._channels   = null;
	this._sampleRate = null;
	this._sampleNum  = null;
};

/**
 * 処理frameにデフォルト値を挿入する
 * @param frame
 */
com.ttProject.frame.base.AudioSelector.prototype.setup = function(frame) {
	frame.setChannels(this._channel);
	frame.setSampleNum(this._sampleNum);
	frame.setSampleRate(this._sampleRate);
};

com.ttProject.frame.base.AudioSelector.prototype.setChannels = function(channels) {
	this._channels = channels;
};

com.ttProject.frame.base.AudioSelector.prototype.setSampleNum = function(sampleNum) {
	this._sampleNum = sampleNum;
};

com.ttProject.frame.base.AudioSelector.prototype.setSampleRate = function(sampleRate) {
	this._sampleRate = sampleRate;
};
