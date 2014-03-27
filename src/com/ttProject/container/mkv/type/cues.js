goog.provide("com.ttProject.container.mkv.type.Cues");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Cues = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Cues, com.ttProject.container.mkv.MkvMasterTag);
