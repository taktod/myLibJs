goog.provide("com.ttProject.container.mkv.type.SeekPosition");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SeekPosition = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SeekPosition, com.ttProject.container.mkv.MkvUnsignedIntTag);
