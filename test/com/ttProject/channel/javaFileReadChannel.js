goog.provide("com.ttProject.channel.JavaFileReadChannel");

goog.require("com.ttProject.channel.IReadChannel");

/**
 * テスト動作のrhinoによる動作のためのmyLibのFileReadChannelを利用するためのクラス
 * @constructor
 * @implements {IReadChannel}
 */
com.ttProject.channel.JavaFileReadChannel = function(target) {
	// チャンネルを開いて保持しておく。
	this._jchannel = jcom.ttProject.nio.channels.FileReadChannel.openFileReadChannel(target);
};

goog.inherits(com.ttProject.channel.JavaFileReadChannel, com.ttProject.channel.IReadChannel);

com.ttProject.channel.JavaFileReadChannel.prototype.isOpen = function() {
	return this._jchannel.isOpen();
};

com.ttProject.channel.JavaFileReadChannel.prototype.size = function() {
	return this._jchannel.size();
};

com.ttProject.channel.JavaFileReadChannel.prototype.position = function(position) {
	if(position == undefined) {
		return this._jchannel.position();
	}
	else {
		return this._jchannel.position(position);
	}
	return this;
};

com.ttProject.channel.JavaFileReadChannel.prototype.read = function(length, callback) {
	var buffer = java.nio.ByteBuffer.allocate(length);
	var readLength = this._jchannel.read(buffer); // byteBufferが取得できる。
	buffer.flip(); // flipしておく。
	var u8Ary = new Uint8Array(length);
	var dataView = new DataView(u8Ary.buffer);
	for(var i = 0;i < readLength;i ++) {
		var buf = buffer.get();
		dataView.setUint8(i, buf & 0xFF);
	}
	callback(u8Ary);
};

com.ttProject.channel.JavaFileReadChannel.prototype.close = function() {
	this._jchannel.close();
};
