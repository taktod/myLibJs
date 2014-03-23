goog.provide("com.ttProject.container.mp3.Mp3UnitReader");

goog.require("com.ttProject.container.base.Reader");
goog.require("com.ttProject.container.mp3.Mp3UnitSelector");

/**
 * @constructor
 */
com.ttProject.container.mp3.Mp3UnitReader = function() {
	goog.base(this, new com.ttProject.container.mp3.Mp3UnitSelector());
};

goog.inherits(com.ttProject.container.mp3.Mp3UnitReader, com.ttProject.container.base.Reader);
