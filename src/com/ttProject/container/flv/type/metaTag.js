goog.provide("com.ttProject.container.flv.type.MetaTag");

goog.require("com.ttProject.container.flv.FlvTag");
goog.require("com.ttProject.bit.Bit8");

/**
 * @constructor
 */
com.ttProject.container.flv.type.MetaTag = function(tagByte) {
	if(tagByte == undefined) {
		tagByte = new com.ttProject.bit.Bit8(0x12);
	}
	goog.base(this, tagByte);
	this._buffer = null;
};

goog.inherits(com.ttProject.container.flv.type.MetaTag, com.ttProject.container.flv.FlvTag);

com.ttProject.container.flv.type.MetaTag.prototype.load = function(channel, callback) {
	var _this = this;
	// とりあえず内容を読み込んで保持しておこうか
	channel.read(this.getSize() - 15, function(data) {
		_this._buffer = data;
		channel.read(4, function(data) {
			// 終端の4byteはすてておく
			callback();
		});
	});
};

com.ttProject.container.flv.type.MetaTag.prototype.toString = function() {
	return "metaTag:" + "ts:" + this.getPts();
};
