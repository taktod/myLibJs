goog.provide("com.ttProject.container.mkv.type.Cluster");

goog.require("com.ttProject.container.mkv.MkvMasterTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Cluster = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Cluster, com.ttProject.container.mkv.MkvMasterTag);
