goog.provide("com.ttProject.container.adts.AdtsUnitReader");

goog.require("com.ttProject.container.super.Reader");
goog.require("com.ttProject.container.adts.AdtsUnitSelector");

/**
 * @constructor
 */
com.ttProject.container.adts.AdtsUnitReader = function() {
	goog.base(this, new com.ttProject.container.adts.AdtsUnitSelector());
};

goog.inherits(com.ttProject.container.adts.AdtsUnitReader, com.ttProject.container.super.Reader);
