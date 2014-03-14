goog.provide("com.ttProject.frame.aac.AacFrameSelector");

goog.require("com.ttProject.frame.aac.type.Frame");

/**
 * @constructor
 */
com.ttProject.frame.aac.AacFrameSelector = function() {
	
};

com.ttProject.frame.aac.AacFrameSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	var frame = new com.ttProject.frame.aac.type.Frame();
	frame.minimumLoad(channel, function() {
		callback(frame);
	});
};