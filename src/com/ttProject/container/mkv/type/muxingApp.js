goog.provide("com.ttProject.container.mkv.type.MuxingApp");

goog.require("com.ttProject.container.mkv.MkvUtf8Tag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.MuxingApp = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.MuxingApp, com.ttProject.container.mkv.MkvUtf8Tag);
