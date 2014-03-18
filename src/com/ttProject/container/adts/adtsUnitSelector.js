goog.provide("com.ttProject.container.adts.AdtsUnitSelector");

goog.require("com.ttProject.frame.aac.AacFrameSelector");
goog.require("com.ttProject.container.adts.AdtsUnit");
goog.require("com.ttProject.frame.aac.type.Frame");

/**
 * @constructor
 */
com.ttProject.container.adts.AdtsUnitSelector = function() {
	this._passedTic = 0;
	this._frameSelector = new com.ttProject.frame.aac.AacFrameSelector();
};

com.ttProject.container.adts.AdtsUnitSelector.prototype.select = function(channel, callback) {
	var _this = this;
	var position = channel.position();
	this._frameSelector.select(channel, function(frame) {
		if(frame != null) {
			var unit = new com.ttProject.container.adts.AdtsUnit(frame, position);
			if(!(frame instanceof com.ttProject.frame.aac.type.Frame)) {
				frame.load(channel, function() {
					_this.select(channel, callback);
				});
			}
			else {
				unit.setTimebase(frame.getSampleRate());
				unit.setPts(_this._passedTic);
				unit.setSize(frame.getSize());
				
				frame.setPts(_this._passedTic);
				frame.setTimebase(frame.getSampleRate());
				_this._passedTic += frame.getSampleNum();
				callback(unit);
			}
		}
		else {
			callback(null);
		}
	});
};