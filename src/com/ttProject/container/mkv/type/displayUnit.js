goog.provide("com.ttProject.container.mkv.type.DisplayUnit");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.DisplayUnit = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.DisplayUnit, com.ttProject.container.mkv.MkvUnsignedIntTag);

