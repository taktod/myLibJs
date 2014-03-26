goog.provide("com.ttProject.container.mkv.type.TimecodeScale");

goog.require("com.ttProject.container.mkv.MkvUnsignedIntTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.TimecodeScale = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.TimecodeScale, com.ttProject.container.mkv.MkvUnsignedIntTag);

com.ttProject.container.mkv.type.TimecodeScale.prototype.getTimebaseValue = function() {
	return 1000000000 / this.getValue();
};
