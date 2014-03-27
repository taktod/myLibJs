goog.provide("com.ttProject.container.mkv.type.PixelHeight");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.PixelHeight = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.PixelHeight, com.ttProject.container.mkv.MkvUnsignedIntTag);

