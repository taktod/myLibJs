goog.provide("com.ttProject.frame.h264.ConfigData");

goog.require("com.ttProject.frame.h264.type.SequenceParameterSet");
goog.require("com.ttProject.frame.h264.type.PictureParameterSet");

com.ttProject.frame.h264.ConfigData = function() {
	this._selector = null;
};

com.ttProject.frame.h264.ConfigData.prototype.setSelector = function(selector) {
	this._selector = selector;
};

com.ttProject.frame.h264.ConfigData.prototype.getNalsFrame = function(channel) {
	
};

com.ttProject.frame.h264.ConfigData.prototype.makeConfigData = function(sps, pps) {
	
};
