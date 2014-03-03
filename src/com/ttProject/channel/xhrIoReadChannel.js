goog.provide("com.ttProject.channel.XhrIoReadChannel");

goog.require('goog.net.XhrIo');
goog.require("goog.net.Jsonp"); // 別パッケージにあるみたいですね。(一応binaryしか興味ないので、ここにある必要はないけど・・・)
goog.require("com.ttProject.channel.IReadChannel");
goog.require("com.ttProject.util.HexUtil");

/**
 * XhrIoをベースにしたデータ読み取りChannel動作
 * これが問題だな・・・
 * http://ja.wikipedia.org/wiki/XMLHttpRequest#.E3.82.B9.E3.83.88.E3.83.AA.E3.83.BC.E3.83.9F.E3.83.B3.E3.82.B0
 * とりあえず、onReadyStateChangeをみて、追加データをとればいい感じかな・・・
 * readするときにデータが足りなければちょくちょく、setIntervalかなにかかけて、待たせる感じで・・・
 * この書き方はjavascriptとしては気持ち悪いだろうね。
 * javascriptにはsleepがないので、まっといて・・・というのができないっぽいですね。
 * @param path
 */
(function(path){
	path.XhrIoReadChannel = function() {
		// とりあえず動作テストしてみる。
		xhr = new goog.net.XhrIo();
		xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
		xhr.headers.set("Range", "bytes=0-10"); // rangeリクエストはいけるっぽい。
		goog.events.listen(xhr, goog.net.EventType.READY_STATE_CHANGE, function(e) {
			console.log(e.target.getResponse());
		});
		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
			// 応答データはここでしか拾えないみたい。
			console.log(e.target.getResponse());
			console.log(com.ttProject.util.HexUtil.toHex(new Uint8Array(e.target.getResponse())));
		});
		xhr.send("../ahiru.flv");
/*		xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost/~todatakahiko/myLibJs/ahiru.flv", true);
		xhr.responseType = "arraybuffer";
		xhr.onload = function(e) {
			console.log("loadおわり");
			console.log(xhr.response);
			var ary = new Uint8Array(xhr.response);
			console.log(com.ttProject.util.HexUtil.toHex(ary, 0, 10, true));
		};
		xhr.send(null);*/
	};
	goog.inherits(path.XhrIoReadChannel, path.IReadChannel);
	path.XhrIoReadChannel.prototype.isOpen = function() {
	};
	path.XhrIoReadChannel.prototype.size = function() {
		
	};
	path.XhrIoReadChannel.prototype.position = function(position) {
		
	};
	path.XhrIoReadChannel.prototype.read = function(uint8Array, callback) {
		
	};
	path.XhrIoReadChannel.prototype.close = function() {
		
	};
})(com.ttProject.channel);
