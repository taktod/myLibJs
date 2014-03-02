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
	path.Uint8ReadChannel.prototype.position = function(val) {
		if(val == undefined) {
			// 位置参照
			return this.position;
		}
		else {
			// 位置設定
			if(val > this.buffer.length) {
				throw new Error("設定位置が配列外です。");
			}
			this.position = val;
		}
		return this;
	};
	path.Uint8ReadChannel.prototype.read = function(uint8Array) {
		// 入力uint8Arrayにデータをいれていく。
//		positionから先のデータをuint8Arrayにいれて応答していけばよい
		var length = (this.buffer.length - this.position > uint8Array.length) ? uint8Array.length : this.buffer.length - this.position; 
		for(var i = 0;i < length;i ++) {
			uint8Array[i] = this.buffer[this.position ++];
		}
		// 読み込めたデータ量を応答しておく。
		return length;
	};
	path.Uint8ReadChannel.prototype.close = function() {
	};
})(com.ttProject.channel);