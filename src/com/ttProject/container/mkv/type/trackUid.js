goog.provide("com.ttProject.container.mkv.type.TrackUID");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TrackUID = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TrackUID, com.ttProject.container.mkv.MkvUnsignedIntTag);
