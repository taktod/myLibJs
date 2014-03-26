goog.provide("com.ttProject.container.mkv.type.WritingApp");

goog.require("com.ttProject.container.mkv.MkvUtf8Tag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.WritingApp = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.WritingApp, com.ttProject.container.mkv.MkvUtf8Tag);
