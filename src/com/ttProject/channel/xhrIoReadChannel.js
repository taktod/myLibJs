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

	// byte -> stringの変換方法メモ
	// String.fromCharCode.apply(null, new Uint8Array([0x30,0x31,0x32,0x33]));

 * XhrIoReadChannelは複数読み込みorderがはいったときに、前から順に応答を返すようにしておきたい。
 * 前のデータの処理がおわっていなかったら、データがおわるまで待ってその後、データを返すみたいな感じで・・・
 * @param com.ttProject.channel
 */
com.ttProject.channel.XhrIoReadChannel = function(targetUrl) {
	/** 処理位置 */
	this._pos = 0;
	/** アクセス可不可フラグ */
	this._accessFlg = true;
	/** 対象url */
	this._url = targetUrl;
	/** 対象データのサイズ */
	this._size = 0;
	/** 応答のデータ保持(順番にcallbackを発動させるために必要) */
	this._resOrder = [];
};
goog.inherits(com.ttProject.channel.XhrIoReadChannel, com.ttProject.channel.IReadChannel);
com.ttProject.channel.XhrIoReadChannel.prototype.isOpen = function() {
	// とりあえず開いているフラグは意味をなさないと思う
	return this._accessFlg;
};
com.ttProject.channel.XhrIoReadChannel.prototype.size = function() {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// はじめにちょっとだけデータをDLして相手のデータサイズを知っておきたい
	return this._size;
};
com.ttProject.channel.XhrIoReadChannel.prototype.position = function(position) {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// 処理位置を保持しておく必要ありそう。
	if(position == undefined) {
		return this._pos;
	}
	else {
		if(this._size != 0 && position > this._size) {
			throw new Error("コンテンツデータより大きな値が指定されました。");
		}
		this._pos = position;
	}
	return this;
};
com.ttProject.channel.XhrIoReadChannel.prototype.read = function(length, callback) {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// xhrIoで配列分だけデータを読みこんでcallbackで応答を返します。
	var _this = this;
	var xhr = new goog.net.XhrIo();
	// 応答はbinaryとして受け取る
	xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
	// とりあえず、先頭の12バイトだけ読み込む
	console.log("bytes=" + this._pos + "-" + (this._pos + length - 1));
	xhr.headers.set("Range", "bytes=" + this._pos + "-" + (this._pos + length - 1));
	// どうやらオーバーしても読み込めた量だけ、応答してくれるみたいです。
	goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
		_this._size = /\/(\d+)/.exec(e.target.getResponseHeader("Content-Range"))[1]; // 相手のデータのサイズを取得できる。
		var responseArray = new Uint8Array(e.target.getResponse());
		if(_this._resOrder[0].xhr == xhr) {
			// そのまま応答する
			var order = _this._resOrder.shift();
			order.callback(responseArray);
			// 保持データに応答が返せるものがあったら応答しておく。
			while(_this._resOrder.length > 0) {
				// 内容があったら調査しておく。
				var order = _this._resOrder.shift();
				if(order.res != null) {
					order.callback(order.res);
				}
				else {
					_this._resOrder.unshift(order);
					break;
				}
			}
		}
		else {
			// cacheしてあとで応答する
			// 自分のデータをみつけて処理しておく。
			for(var key in _this._resOrder) {
				var order = _this._resOrder[key];
				if(order.xhr == xhr) {
					// みつかった
					order.res = responseArray;
					break;
				}
			}
		}
	});
	this._resOrder.push({xhr:xhr, res:null, callback:callback});
	this._pos += length;
	xhr.send(this._url);
};
com.ttProject.channel.XhrIoReadChannel.prototype.close = function() {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// これ以上アクセスしないようにします。
	this._accessFlg = false;
};
