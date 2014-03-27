goog.provide("com.ttProject.container.mkv.type.CueTrackPositions");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CueTrackPositions = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CueTrackPositions, com.ttProject.container.mkv.MkvMasterTag);
