goog.provide("com.ttProject.container.mkv.type.Duration");

goog.require("com.ttProject.container.mkv.MkvFloatTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Duration = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Duration, com.ttProject.container.mkv.MkvFloatTag);
