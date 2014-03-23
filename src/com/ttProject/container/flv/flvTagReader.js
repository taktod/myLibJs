goog.provide("com.ttProject.container.flv.FlvTagReader");

goog.require("com.ttProject.container.base.Reader");
goog.require("com.ttProject.container.flv.FlvTagSelector");

/**
 * @constructor
 */
com.ttProject.container.flv.FlvTagReader = function() {
	goog.base(this, new com.ttProject.container.flv.FlvTagSelector());
};

goog.inherits(com.ttProject.container.flv.FlvTagReader, com.ttProject.container.base.Reader);
