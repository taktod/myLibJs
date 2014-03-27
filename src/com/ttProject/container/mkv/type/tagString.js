goog.provide("com.ttProject.container.mkv.type.TagString");

goog.require("com.ttProject.container.mkv.MkvUtf8Tag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TagString = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TagString, com.ttProject.container.mkv.MkvUtf8Tag);
