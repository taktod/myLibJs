goog.provide("com.ttProject.container.mkv.type.Void");

//goog.require("com.ttProject.container.mkv.MkvMasterTag");
goog.require("com.ttProject.container.mkv.MkvTag"); // jsでは内部データの解析に興味ないので、mkvTagにして中身は読み飛ばす

/**
 * @constructor
 */
com.ttProject.container.mkv.type.Void = function(id, size) {
	goog.base(this, id, size);
};

goog.inherits(com.ttProject.container.mkv.type.Void, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.type.Void.prototype.toString = function() {
	return "void";
};
