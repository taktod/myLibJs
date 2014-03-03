goog.provide("com.ttProject.channel.Uint8ReadChannel");

goog.require("com.ttProject.channel.IReadChannel");

/**
 * Uint8ReadChannel
 * uint8arrayに格納されているデータを順番に読み取っていくチャンネル
 */
(function(path){
	/**
	 * @constructor
	 * @implements {IReadChannel}
	 */
	path.Uint8ReadChannel = function(uint8Array) {
		// 大本のデータに影響を与えないように、uint8Arrayオブジェクトをつくりなおしておく。
		this.buffer = new Uint8Array(uint8Array);
		this.position = 0;
	};
	goog.inherits(path.Uint8ReadChannel, path.IReadChannel);
	path.Uint8ReadChannel.prototype.buffer = null;
	path.Uint8ReadChannel.prototype.position = null;
	path.Uint8ReadChannel.prototype.isOpen = function() {
		return true;
	};
	path.Uint8ReadChannel.prototype.size = function() {
		return this.buffer.length;
	};
	path.Uint8ReadChannel.prototype.position = function(position) {
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
	path.Uint8ReadChannel.prototype.read = function(uint8Array, callback) {
		// 入力uint8Arrayにデータをいれていく。
//		positionから先のデータをuint8Arrayにいれて応答していけばよい
		// データが必要な量たまったら、callbackで応答を返す形にする。
		if(this.buffer.length - this.position < uint8Array.length) {
			throw new Error("保持データ量以上読み込もうとしました。");
		}
		var length = uint8Array.length;
		for(var i = 0;i < length;i ++) {
			uint8Array[i] = this.buffer[this.position ++];
		}
		callback(uint8Array);
	};
	path.Uint8ReadChannel.prototype.close = function() {
	};
})(com.ttProject.channel);