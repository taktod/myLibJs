goog.provide("com.ttProject.container.mkv.type.SimpleTag");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SimpleTag = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SimpleTag, com.ttProject.container.mkv.MkvMasterTag);
