goog.provide("com.ttProject.container.mkv.MkvFloatTag");

goog.require("com.ttProject.container.mkv.MkvTag");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.BitConnector");
goog.require("com.ttProject.bit.Bit32");
goog.require("com.ttProject.bit.Bit64");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvFloatTag = function(id, size) {
	goog.base(this, id, size);
	this._value = null; // bitNで保持させるか・・・
};

goog.inherits(com.ttProject.container.mkv.MkvFloatTag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvFloatTag.prototype.load = function(channel, callback) {
	var _this = this;
	var bitValue = null;
	var loader = new com.ttProject.bit.BitLoader(channel);
	switch(this.getMkvSize()) {
	case 4:
		bitValue = new com.ttProject.bit.Bit32();
		break;
	case 8:
		bitValue = new com.ttProject.bit.Bit64();
		break;
	default:
		throw new Error("データ量がおかしいです。:" + this.getMkvSize());
	}
	console.log(channel.position());
	loader.load(bitValue, function() {
		console.log(channel.position());
		_this._value = bitValue;
		console.log(bitValue);
		console.log(bitValue.get().toString(16));
		console.log(_this.getValue());
	});
};

com.ttProject.container.mkv.MkvFloatTag.prototype.getValue = function() {
	var connector = new com.ttProject.bit.BitConnector();
	var data = connector.connect(this._value);
	var dataView = new DataView(data.buffer);
	switch(this.getMkvSize()) {
	case 4:
		return dataView.getFloat32(0);
	case 8:
		return dataView.getFloat64(0);
	default:
		throw new Error("データサイズがおかしいです。:" + this.getMkvSize());
	}
};

// setValueもwriterの為に必要そう
//com.ttProject.container.mkv.MkvFloatTag.prototype.setValue = function(val) {
//	
//};