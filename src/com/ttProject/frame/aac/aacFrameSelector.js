goog.provide("com.ttProject.frame.aac.AacFrameSelector");

goog.require("com.ttProject.frame.aac.type.Frame");
goog.require("com.ttProject.frame.base.AudioSelector");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacFrameSelector = function() {
	goog.base(this);
};

goog.inherits(com.ttProject.frame.aac.AacFrameSelector, com.ttProject.frame.base.AudioSelector);

com.ttProject.frame.aac.AacFrameSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	var frame = new com.ttProject.frame.aac.type.Frame();
	this.setup(frame);
	frame.minimumLoad(channel, function() {
		callback(frame);
	});
};