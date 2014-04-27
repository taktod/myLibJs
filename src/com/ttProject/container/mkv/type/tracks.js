goog.provide("com.ttProject.container.mkv.type.Tracks");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Tracks = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Tracks, com.ttProject.container.mkv.MkvMasterTag);

com.ttProject.container.mkv.type.Tracks.prototype.toString = function() {
	return "tracks";
};
