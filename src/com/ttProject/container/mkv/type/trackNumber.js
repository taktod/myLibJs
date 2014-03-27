goog.provide("com.ttProject.container.mkv.type.TrackNumber");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TrackNumber = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TrackNumber, com.ttProject.container.mkv.MkvUnsignedIntTag);
