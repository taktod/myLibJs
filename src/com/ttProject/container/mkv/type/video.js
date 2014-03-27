goog.provide("com.ttProject.container.mkv.type.Video");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Video = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Video, com.ttProject.container.mkv.MkvMasterTag);
