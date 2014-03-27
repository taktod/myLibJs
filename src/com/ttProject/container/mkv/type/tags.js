goog.provide("com.ttProject.container.mkv.type.Tags");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Tags = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Tags, com.ttProject.container.mkv.MkvMasterTag);
