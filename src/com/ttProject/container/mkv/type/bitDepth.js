goog.provide("com.ttProject.container.mkv.type.BitDepth");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.BitDepth = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.BitDepth, com.ttProject.container.mkv.MkvUnsignedIntTag);

