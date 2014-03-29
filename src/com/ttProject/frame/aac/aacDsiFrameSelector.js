goog.provide("com.ttProject.frame.aac.AacDsiFrameSelector");

goog.require("com.ttProject.frame.aac.type.Frame");
goog.require("com.ttProject.frame.base.AudioSelector");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacDsiFrameSelector = function() {
	goog.base(this);
	this._dsi = null;
};

goog.inherits(com.ttProject.frame.aac.AacDsiFrameSelector, com.ttProject.frame.base.AudioSelector);

com.ttProject.frame.aac.AacDsiFrameSelector.prototype.setDecoderSpecificInfo = function(dsi) {
	this._dsi = dsi;
};

com.ttProject.frame.aac.AacDsiFrameSelector.prototype.select = function(channel, callback) {
	if(this._dsi == null) {
		throw new Error("dsiが未定義なので、処理できません。");
	}
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	var frame = new com.ttProject.frame.aac.type.Frame();
	this.setup(frame);
	frame.loadDecoderSpecificInfo(channel.size(), this._dsi, channel, function() {
		callback(frame);
	});
};
