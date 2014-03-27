goog.provide("com.ttProject.container.mkv.type.CodecID");

goog.require("com.ttProject.container.mkv.MkvStringTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CodecID = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CodecID, com.ttProject.container.mkv.MkvStringTag);
