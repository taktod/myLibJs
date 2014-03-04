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
 * javascriptにはsleepがないので、まっといて・・・というのができないっぽいですね。
 * 
 * @param path
 */
(function(path){
	path.XhrIoReadChannel = function(targetUrl) {
		// byte -> stringの変換方法メモ
		// String.fromCharCode.apply(null, new Uint8Array([0x30,0x31,0x32,0x33]));
		var _this = this;
		// とりあえず動作テストしてみる。
		var xhr = new goog.net.XhrIo();
		// 応答はbinaryとして受け取る
		xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
		// とりあえず、先頭の12バイトだけ読み込む
		xhr.headers.set("Range", "bytes=0-12"); // rangeリクエストはいけるっぽい。
		// readyStateChangeはつかえないっぽい。
/*		goog.events.listen(xhr, goog.net.EventType.READY_STATE_CHANGE, function(e) {
			console.log(e.target.getResponse());
		});*/
		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
			// 応答データはここでしか拾えないみたい。
			_this.size = /\/(\d+)/.exec(e.target.getResponseHeader("Content-Range"))[1]; // 相手のデータのサイズを取得できる。
			_this.accessFlg = true;
			console.log(e.target);
			console.log(e.target.getResponse());
			console.log(com.ttProject.util.HexUtil.toHex(new Uint8Array(e.target.getResponse())));
		});
		this.pos = 0;
		this.accessFlg = false;
		this.url = targetUrl;
		xhr.send(targetUrl);
	};
	goog.inherits(path.XhrIoReadChannel, path.IReadChannel);
	// 対象url
	path.XhrIoReadChannel.prototype.url = null;
	// 対象データのデータ量
	path.XhrIoReadChannel.prototype.size = null;
	// 処理位置
	path.XhrIoReadChannel.prototype.pos = null;
	path.XhrIoReadChannel.prototype.accessFlg = null;
	path.XhrIoReadChannel.prototype.isOpen = function() {
		// とりあえず開いているフラグは意味をなさないと思う
		return this.accessFlg;
	};
	path.XhrIoReadChannel.prototype.size = function() {
		if(!this.accessFlg) {
			throw new Error("接続が破棄済みです。");
		}
		// はじめにちょっとだけデータをDLして相手のデータサイズを知っておきたい
		return this.size;
	};
	path.XhrIoReadChannel.prototype.position = function(position) {
		if(!this.accessFlg) {
			throw new Error("接続が破棄済みです。");
		}
		// 処理位置を保持しておく必要ありそう。
		if(position == undefined) {
			return this.pos;
		}
		else {
			if(position > this.size) {
				throw new Error("コンテンツデータより大きな値が指定されました。");
			}
			this.pos = position;
		}
		return this;
	};
	path.XhrIoReadChannel.prototype.read = function(uint8Array, callback) {
		if(!this.accessFlg) {
			throw new Error("接続が破棄済みです。");
		}
		// xhrIoで配列分だけデータを読みこんでcallbackで応答を返します。
		var _this = this;
		var xhr = new goog.net.XhrIo();
		// 応答はbinaryとして受け取る
		xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
		// とりあえず、先頭の12バイトだけ読み込む
		console.log("bytes=" + this.pos + "-" + (this.pos + uint8Array.length));
		xhr.headers.set("Range", "bytes=" + this.pos + "-" + (this.pos + uint8Array.length));
		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
			_this.pos += uint8Array.length;
			var responseArray = new Uint8Array(e.target.getResponse());
			callback(responseArray);
		});
		xhr.send(this.url);
	};
	path.XhrIoReadChannel.prototype.close = function() {
		if(!this.accessFlg) {
			throw new Error("接続が破棄済みです。");
		}
		// これ以上アクセスしないようにします。
		this.accessFlg = false;
	};
})(com.ttProject.channel);
