goog.provide("com.ttProject.container.mkv.type.TrackEntry");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TrackEntry = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TrackEntry, com.ttProject.container.mkv.MkvMasterTag);
