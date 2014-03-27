goog.provide("com.ttProject.container.mkv.type.CueTime");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CueTime = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CueTime, com.ttProject.container.mkv.MkvUnsignedIntTag);

