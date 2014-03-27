goog.provide("com.ttProject.container.mkv.type.DisplayWidth");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.DisplayWidth = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.DisplayWidth, com.ttProject.container.mkv.MkvUnsignedIntTag);

