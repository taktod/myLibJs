goog.provide("com.ttProject.frame.h264.ConfigData");

goog.require("com.ttProject.frame.h264.type.SequenceParameterSet");
goog.require("com.ttProject.frame.h264.type.PictureParameterSet");
goog.require("com.ttProject.frame.h264.H264FrameSelector");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit16");

com.ttProject.frame.h264.ConfigData = function() {
	this._selector = null;
	this._sps = null;
	this._pps = null;
};

com.ttProject.frame.h264.ConfigData.prototype.setSelector = function(selector) {
	this._selector = selector;
};

com.ttProject.frame.h264.ConfigData.prototype.setPps = function(pps) {
	this._pps = pps;
};

com.ttProject.frame.h264.ConfigData.prototype.setSps = function(sps) {
	this._sps = sps;
};

com.ttProject.frame.h264.ConfigData.prototype.getPps = function() {
	return this._pps;
};

com.ttProject.frame.h264.ConfigData.prototype.getSps = function() {
	return this._sps;
};

com.ttProject.frame.h264.ConfigData.prototype.getNalsFrame = function(channel, callback) {
	var selector = this._selector;
	if(selector == null) {
		selector = new com.ttProject.frame.h264.H264FrameSelector();
	}
	if(channel.size() - channel.position() < 8) {
		throw new Error("先頭データのサイズが小さすぎます。");
	}
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	var avcCVersion = new com.ttProject.bit.Bit8();
	var profile = new com.ttProject.bit.Bit8();
	var compatibility = new com.ttProject.bit.Bit8();
	var level = new com.ttProject.bit.Bit8();
	var reserved = new com.ttProject.bit.Bit8(); // ?
	var loadPps = function() {
		var numberOfPps =  new com.ttProject.bit.Bit8();
		var ppsLength = new com.ttProject.bit.Bit16();
		loader.load(numberOfPps, ppsLength, function() {
			channel.read(ppsLength.get(), function(data) {
				var byteChannel = new com.ttProject.channel.Uint8ReadChannel(data);
				selector.select(byteChannel, function(frame) {
					_this._pps = frame;
					callback();
				});
			});
		});
	};
	var loadSps = function() {
		var numberOfSps = new com.ttProject.bit.Bit8();
		var spsLength = new com.ttProject.bit.Bit16();
		loader.load(numberOfSps, spsLength, function() {
			// spsのサイズを計算しておく。
			channel.read(spsLength.get(), function(data) {
				var byteChannel = new com.ttProject.channel.Uint8ReadChannel(data);
				selector.select(byteChannel, function(frame) {
					_this._sps = frame;
					loadPps();
				});
			});
		});
	};
	// 先頭データを読み込む
	loader.load(avcCVersion, profile, compatibility, level, reserved, loadSps);
};

com.ttProject.frame.h264.ConfigData.prototype.makeConfigData = function() {
	
};
