goog.provide("com.ttProject.frame.aac.AacDsiFrameSelector");

goog.require("com.ttProject.frame.aac.type.Frame");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacDsiFrameSelector = function() {
	this._dsi = null;
};

com.ttProject.frame.aac.AacDsiFrameSelector.prototype.setDecoderSpecificInfo = function(dsi) {
	this.dsi = dsi;
};

com.ttProject.frame.aac.AacDsiFrameSelector.prototype.select = function(channel, callback) {
	if(this.dsi == null) {
		throw new Error("dsiが未定義なので、処理できません。");
	}
	var frame = new Frame();
	frame.loadDecoderSpecificInfo(channel.size(), dsi, chanel, function() {
		callback(frame);
	});
};
