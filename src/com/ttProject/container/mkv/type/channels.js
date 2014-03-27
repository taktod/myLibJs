goog.provide("com.ttProject.container.mkv.type.Channels");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Channels = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Channels, com.ttProject.container.mkv.MkvUnsignedIntTag);

