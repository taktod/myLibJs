goog.provide("com.ttProject.container.mkv.type.SeekID");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SeekID = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SeekID, com.ttProject.container.mkv.MkvBinaryTag);
