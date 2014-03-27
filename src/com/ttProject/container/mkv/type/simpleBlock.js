goog.provide("com.ttProject.container.mkv.type.SimpleBlock");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SimpleBlock = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SimpleBlock, com.ttProject.container.mkv.MkvBinaryTag);
