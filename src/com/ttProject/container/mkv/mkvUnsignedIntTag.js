goog.provide("com.ttProject.container.mkv.MkvUnsignedIntTag");

goog.require("com.ttProject.container.mkv.MkvTag");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.base.BitN");
goog.require("com.ttProject.bit.BitLoader");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvUnsignedIntTag = function(id, size) {
	goog.base(this, id, size);
	this._value = null; // bitNで保持させるか・・・
};

goog.inherits(com.ttProject.container.mkv.MkvUnsignedIntTag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvUnsignedIntTag.prototype.load = function(channel, callback) {
	var _this = this;
	var bit8List = [];
	for(var i = 0;i < this.getMkvSize();i ++) {
		bit8List.push(new com.ttProject.bit.Bit8());
	}
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(bit8List, function() {
		_this._value = new com.ttProject.bit.base.BitN(bit8List);
		callback();
	});
};

com.ttProject.container.mkv.MkvUnsignedIntTag.prototype.getValue = function() {
	return this._value.get();
};

// これにはsetValueも必要(writerを実装するならいる。)