goog.provide("com.ttProject.container.mkv.type.EBML");

//goog.require("com.ttProject.container.mkv.MkvMasterTag");
goog.require("com.ttProject.container.mkv.MkvTag"); // jsでは内部データの解析に興味ないので、mkvTagにして中身は読み飛ばす

/**
 * @constructor
 */
com.ttProject.container.mkv.type.EBML = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.EBML, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.type.EBML.prototype.toString = function() {
	return "ebml";
};
