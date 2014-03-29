goog.provide("com.ttProject.frame.mjpeg.type.Frame");

goog.require("com.ttProject.frame.mjpeg.MjpegFrame");

/**
 * Frame
 * @constructor
 */
com.ttProject.frame.mjpeg.type.Frame = function() {
	goog.base(this);
	this._buffer;
};

goog.inherits(com.ttProject.frame.mjpeg.type.Frame, com.ttProject.frame.mjpeg.MjpegFrame);

com.ttProject.frame.mjpeg.type.Frame.prototype.minimumLoad = function(channel, callback) {
	// 縦横データくらい解析しておいた方がいいのかな？
	// とりあえず面倒なので、selectorかreaderで設定してもらうか・・・
	// とりあえず特にすることはない。
	// サイズはchannelに依存しよう。
	// まじめに読み込むならFF D8 - FF D9のデータを読み込めばOK
	// サイズを取得したい場合はFF C0のタグの中身
	// FF CO si ze xx he gh wi dt ...の部分を読み込めば縦横サイズが取得可能。
	this.setSize(channel.size());
	callback();
};

com.ttProject.frame.mjpeg.type.Frame.prototype.load = function(channel, callback) {
	// 内容データを保持しておかないとだめ。
	var _this = this;
	channel.read(this.getSize(), function(data) {
		_this._buffer = data;
		callback();
	});
};
