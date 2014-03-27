goog.provide("com.ttProject.container.mkv.type.FlagLacing");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.FlagLacing = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.FlagLacing, com.ttProject.container.mkv.MkvUnsignedIntTag);
