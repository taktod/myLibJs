goog.provide("com.ttProject.container.mkv.type.CodecPrivate");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CodecPrivate = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CodecPrivate, com.ttProject.container.mkv.MkvBinaryTag);
