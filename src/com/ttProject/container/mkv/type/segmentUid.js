goog.provide("com.ttProject.container.mkv.type.SegmentUID");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SegmentUID = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SegmentUID, com.ttProject.container.mkv.MkvBinaryTag);
