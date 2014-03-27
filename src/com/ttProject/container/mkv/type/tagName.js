goog.provide("com.ttProject.container.mkv.type.TagName");

goog.require("com.ttProject.container.mkv.MkvUtf8Tag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TagName = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TagName, com.ttProject.container.mkv.MkvUtf8Tag);
