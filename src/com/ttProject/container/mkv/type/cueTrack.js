goog.provide("com.ttProject.container.mkv.type.CueTrack");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CueTrack = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CueTrack, com.ttProject.container.mkv.MkvUnsignedIntTag);

