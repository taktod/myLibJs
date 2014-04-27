goog.provide("com.ttProject.container.mkv.type.Segment");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Segment = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Segment, com.ttProject.container.mkv.MkvMasterTag);

com.ttProject.container.mkv.type.Segment.prototype.toString = function() {
	return "segment";
};
