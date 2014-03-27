goog.provide("com.ttProject.container.mkv.type.Audio");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Audio = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Audio, com.ttProject.container.mkv.MkvMasterTag);
