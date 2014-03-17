goog.provide("com.ttProject.container.mp3.Mp3UnitSelector");

goog.require("com.ttProject.frame.mp3.Mp3FrameSelector");
goog.require("com.ttProject.container.mp3.Mp3Unit");
goog.require("com.ttProject.frame.mp3.type.Frame");

/**
 * @constructor
 */
com.ttProject.container.mp3.Mp3UnitSelector = function() {
	/** 処理済みサンプル数を保持しておく */
	this._passedTic = 0;
	this._frameSelector = new com.ttProject.frame.mp3.Mp3FrameSelector();
};

com.ttProject.container.mp3.Mp3UnitSelector.prototype.select = function(channel, callback) {
	var _this = this;
	var position = channel.position();
	this._frameSelector.select(channel, function(frame) {
		if(frame != null) {
			var unit = new com.ttProject.container.mp3.Mp3Unit(frame, position);
			if(!(frame instanceof com.ttProject.frame.mp3.type.Frame)) {
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