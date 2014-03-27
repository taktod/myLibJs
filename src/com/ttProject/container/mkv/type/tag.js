goog.provide("com.ttProject.container.mkv.type.Tag");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Tag = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Tag, com.ttProject.container.mkv.MkvMasterTag);
