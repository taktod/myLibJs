goog.provide("com.ttProject.channel.XhrIoReadChannel");

goog.require('goog.net.XhrIo');
goog.require("goog.net.Jsonp"); // 別パッケージにあるみたいですね。(一応binaryしか興味ないので、ここにある必要はないけど・・・)
goog.require("com.ttProject.channel.IReadChannel");

/**
 * XhrIoをベースにしたデータ読み取りChannel動作
 * これが問題だな・・・
 * http://ja.wikipedia.org/wiki/XMLHttpRequest#.E3.82.B9.E3.83.88.E3.83.AA.E3.83.BC.E3.83.9F.E3.83.B3.E3.82.B0
 * とりあえず、onReadyStateChangeをみて、追加データをとればいい感じかな・・・
 * readするときにデータが足りなければちょくちょく、setIntervalかなにかかけて、待たせる感じで・・・
 * この書き方はjavascriptとしては気持ち悪いだろうね。
 * @param path
 */
(function(path){
	path.XhrIoReadChannel = function() {
		// とりあえず動作テストしてみる。
		goog.net.XhrIo.send("http://localhost/~todatakahiko/myLibJs/ahiru.flv", function(e) {
			console.log(e);
		});
	};
	goog.inherits(path.XhrIoReadChannel, path.IReadChannel);
	path.XhrIoReadChannel.prototype.isOpen = function() {
	};
	path.XhrIoReadChannel.prototype.size = function() {
		
	};
	path.XhrIoReadChannel.prototype.position = function(position) {
		
	};
	path.XhrIoReadChannel.prototype.read = function(uint8Array) {
		
	};
	path.XhrIoReadChannel.prototype.close = function() {
		
	};
})(com.ttProject.channel);
