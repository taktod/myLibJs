goog.provide("com.ttProject.container.mkv.MkvBlockTag");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.EbmlValue");
goog.require("com.ttProject.bit.Bit16");

/**
 * simpleBlockやBlockTag共通の動作をつくっておきます。
 * @constructor
 */
com.ttProject.container.mkv.MkvBlockTag = function(id, size) {
	goog.base(this, id, size);
	this._trackId = new com.ttProject.bit.EbmlValue(); // ebmlValue
	this._timestampDiff = new com.ttProject.bit.Bit16(); // bit16
	this._time = 0;
	this._frame;
};

goog.inherits(com.ttProject.container.mkv.MkvBlockTag, com.ttProject.container.mkv.MkvBinaryTag);

com.ttProject.container.mkv.MkvBlockTag.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	goog.base(this, "minimumLoad", channel, function() {
		var loader = new com.ttProject.bit.BitLoader(channel);
		loader.load(_this._trackId, _this._timestampDiff, callback);
	});
};

com.ttProject.container.mkv.MkvBlockTag.prototype.load = function(channel, callback) {
	var _this = this;
	goog.base(this, "load", channel, function() {
		// clusterTimeの参照はまだつくってないはず
//		_this._time = _this.getMkvTagReader().getClusterTime() + _this._timestampDiff.get();
		callback();
	});
};

com.ttProject.container.mkv.MkvBlockTag.prototype.getRemainedSize = function() {
	return this.getMkvSize();
};

com.ttProject.container.mkv.MkvBlockTag.prototype.getTrackId = function() {
	return this._trackId;
};
