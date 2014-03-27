goog.provide("com.ttProject.container.mkv.type.TrackType");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TrackType = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TrackType, com.ttProject.container.mkv.MkvUnsignedIntTag);

