goog.provide("com.ttProject.container.mkv.type.CueClusterPosition");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.CueClusterPosition = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.CueClusterPosition, com.ttProject.container.mkv.MkvUnsignedIntTag);

