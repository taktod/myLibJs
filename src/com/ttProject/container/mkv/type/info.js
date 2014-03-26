goog.provide("com.ttProject.container.mkv.type.Info");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Info = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Info, com.ttProject.container.mkv.MkvMasterTag);
