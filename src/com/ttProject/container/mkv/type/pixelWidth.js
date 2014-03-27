goog.provide("com.ttProject.container.mkv.type.PixelWidth");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.PixelWidth = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.PixelWidth, com.ttProject.container.mkv.MkvUnsignedIntTag);

