goog.provide("com.ttProject.container.mkv.type.SeekHead");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SeekHead = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SeekHead, com.ttProject.container.mkv.MkvMasterTag);

com.ttProject.container.mkv.type.SeekHead.prototype.toString = function() {
	return "seekHead";
};
