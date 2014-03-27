goog.provide("com.ttProject.container.mkv.type.SamplingFrequency");

goog.require("com.ttProject.container.mkv.MkvFloatTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.SamplingFrequency = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.SamplingFrequency, com.ttProject.container.mkv.MkvFloatTag);
