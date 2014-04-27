goog.provide("com.ttProject.container.mkv.type.Timecode");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Timecode = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Timecode, com.ttProject.container.mkv.MkvUnsignedIntTag);

com.ttProject.container.mkv.type.Timecode.prototype.toString = function() {
	return "timecode:" + this.getValue();
};
