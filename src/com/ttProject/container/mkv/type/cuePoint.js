goog.provide("com.ttProject.container.mkv.type.CuePoint");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CuePoint = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CuePoint, com.ttProject.container.mkv.MkvMasterTag);
