goog.provide("com.ttProject.container.mkv.type.Seek");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Seek = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Seek, com.ttProject.container.mkv.MkvMasterTag);
