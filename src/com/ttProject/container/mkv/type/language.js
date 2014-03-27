goog.provide("com.ttProject.container.mkv.type.Language");

goog.require("com.ttProject.container.mkv.MkvStringTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Language = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Language, com.ttProject.container.mkv.MkvStringTag);
