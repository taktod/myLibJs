goog.provide("com.ttProject.container.mkv.MkvMasterTag");

goog.require("com.ttProject.container.mkv.MkvTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvMasterTag = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.MkvMasterTag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvMasterTag.prototype.load = function(channel, callback) {
	
//	console.log("内部タグを読み込む必要あり。");
};
