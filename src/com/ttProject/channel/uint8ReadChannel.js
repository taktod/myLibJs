goog.provide("com.ttProject.channel.Uint8ReadChannel");

goog.require("com.ttProject.channel.IReadChannel");

/**
 * @constructor
 * @implements {IReadChannel}
 */
com.ttProject.channel.Uint8ReadChannel = function(uint8Array) {
	// 大本のデータに影響を与えないように、uint8Arrayオブジェクトをつくりなおしておく。
	this.buffer = new Uint8Array(uint8Array);
	this.position = 0;
};
goog.inherits(com.ttProject.channel.Uint8ReadChannel, com.ttProject.channel.IReadChannel);
com.ttProject.channel.Uint8ReadChannel.prototype.buffer = null;
com.ttProject.channel.Uint8ReadChannel.prototype.position = null;
com.ttProject.channel.Uint8ReadChannel.prototype.isOpen = function() {
	return true;
};
com.ttProject.channel.Uint8ReadChannel.prototype.size = function() {
	return this.buffer.length;
};
com.ttProject.channel.Uint8ReadChannel.prototype.position = function(position) {
	if(position == undefined) {
		// 位置参照
		return this.position;
	}
	else {
		// 位置設定
		if(position > this.buffer.length) {
			throw new Error("設定位置が配列外です。");
		}
		this.position = position;
	}
	return this;
};
com.ttProject.channel.Uint8ReadChannel.prototype.read = function(length, callback) {
	// 入力uint8Arrayにデータをいれていく。
//		positionから先のデータをuint8Arrayにいれて応答していけばよい
	// データが必要な量たまったら、callbackで応答を返す形にする。
	if(this.buffer.length - this.position < length) {
		throw new Error("保持データ量以上読み込もうとしました。" + length);
	}
	var uint8Array = new Uint8Array(length);
	for(var i = 0;i < length;i ++) {
		uint8Array[i] = this.buffer[this.position ++];
	}
	callback(uint8Array);
};
com.ttProject.channel.Uint8ReadChannel.prototype.close = function() {
};
