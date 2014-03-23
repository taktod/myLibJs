goog.provide("com.ttProject.frame.h264.ConfigData");

goog.require("com.ttProject.frame.h264.type.SequenceParameterSet");
goog.require("com.ttProject.frame.h264.type.PictureParameterSet");
goog.require("com.ttProject.frame.h264.H264FrameSelector");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit16");
goog.require("com.ttProject.channel.Uint8ReadChannel");

/**
 * @constructor
 */
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
					_this._pps.load(byteChannel, callback);
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
					_this._sps.load(byteChannel, loadPps);
				});
			});
		});
	};
	// 先頭データを読み込む
	loader.load(avcCVersion, profile, compatibility, level, reserved, loadSps);
};

com.ttProject.frame.h264.ConfigData.prototype.makeConfigData = function(sps, pps) {
	var spsData = sps.getData();
	var ppsData = pps.getData();
	var data = new Uint8Array(11 + spsData.length + ppsData.length);
	var dataView = new DataView(data.buffer);
	dataView.setUint8(0, 1);
	dataView.setUint8(1, spsData[1]);
	dataView.setUint8(2, spsData[2]);
	dataView.setUint8(3, spsData[3]);
	dataView.setUint16(4, 0xFFE1);
	dataView.setUint16(6, spsData.length);
	data.set(spsData, 8);
	dataView.setUint8(spsData.length + 8, 1);
	dataView.setUint16(spsData.length + 9, ppsData.length);
	data.set(ppsData, spsData.length + 11);
	return data;
};
