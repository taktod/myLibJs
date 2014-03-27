goog.provide("com.ttProject.container.mkv.type.DefaultDuration");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.DefaultDuration = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.DefaultDuration, com.ttProject.container.mkv.MkvUnsignedIntTag);

