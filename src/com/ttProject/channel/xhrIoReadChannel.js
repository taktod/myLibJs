goog.provide("com.ttProject.channel.XhrIoReadChannel");

goog.require('goog.net.XhrIo');
goog.require("goog.net.Jsonp"); // 別パッケージにあるみたいですね。(一応binaryしか興味ないので、ここにある必要はないけど・・・)
goog.require("com.ttProject.channel.IReadChannel");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.util.ArrayUtil");

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
	/** アクセス可不可フラグ */
	this._accessFlg = true;
	/** 対象url */
	this._url = targetUrl;
	/** 対象データのサイズ */
	this._size = 0;
	/** 処理位置 */
	this._pos = 0; // 読み込み要求があった場所を保持しています。
	/** 保持cacheデータ */
	this._cacheBuffer = null; // cacheBufferは次に読み込むべきデータを保持しています。
	// cacheBufferの始めから必要な分だけ読み込めばOKとなるはず。
	// またcacheBufferのデータは読み込ませるとその分減っていくものとします。
	/** データ取得時に最小データ量(最低でもこのデータ分は読み込みます) */
	this._minimumSize = 6553600;
	/** 応答のデータ保持(順番にcallbackを発動させるために必要) */
	this._resOrder = []; // 順番に応答するべきcallbackを保持しておきます。
	/** 応答の帰ってきたデータリスト */
	this._dlData = []; // ダウンロード済みのデータを保持しておきます。
	/** ダウンロード完了を確認します。 */
	this._dlFinishFlg = false;
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
/**
 * 読み込み動作
 * @param length
 * @param callback
 */
com.ttProject.channel.XhrIoReadChannel.prototype.read = function(length, callback) {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// 読み込み動作をつくる必要がある。
	// 読み込みを実施するときに、minimumSize以下の要求だった場合は、minimumSizeのデータを取得する必要がある。
	// すでにDL済み(保持バッファにあるデータで済む場合)はそっちから応答すればよし
	// 要求された順に応答を返す必要がある。
	// これだけ満たさないとだめ。
	// 応答がかえってきたらまずバッファにいれて、必要な分返す必要あり。

	// 処理オブジェクトに_thisでアクセスできるようにしておく。
	var _this = this;

	// 応答用の処理をつくっておきます。
	var response = function() {
		// 応答用の処理を実施する場合は応答に必要なデータbufferがあるものとします。
		// なお読み込みデータがたりなくて処理できないということはないものとします。(要求の段階で必要なデータ量は確保するため。)
		// cacheデータから必要なデータを読み込んで必要な分だけ応答を返していきたい。
		var order = null;
		while((order = _this._resOrder.shift()) != null) {
			// データがある場合は処理を実施する。
			if(order.length > _this._cacheBuffer.length) {
				// 必要な量bufferがない場合は処理できないので、データを戻して処理をぬける。
				_this._resOrder.unshift(order);
				break;
			}
			else {
				// データがある場合は読み込んでcallbackに返す。
				var resData = _this._cacheBuffer.subarray(0, order.length);
				_this._cacheBuffer = _this._cacheBuffer.subarray(order.length);
				order.callback(resData);
			}
		}
	};
	// 応答を返すべき要求がきたので、データを保持しておきます。
	this._resOrder.push({length: length, callback: callback});
	if(this._cacheBuffer == null || this._cacheBuffer.length < length) {
		if(this._dlFinishFlg) {
			callback(null);
			return;
		}
		// 保持データがない場合、もしくは保持データのサイズが足りていない場合はxhrIoでデータを読み込む必要があります。
		// 読み込む必要があるデータ量をきめておく。
		var holdLength = this._cacheBuffer == null ? 0 : this._cacheBuffer.length;
		var neededLength = length - holdLength;
		var requestLength = neededLength > this._minimumSize ? neededLength : this._minimumSize;
		// リクエストするサイズが決定した。
		// rangeでリクエストを送る必要あり。
		var xhr = new goog.net.XhrIo();
		// 応答はbinaryArrayにする
		xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
		var rangeHeader = "bytes=" + (this._pos + holdLength) + "-" + (this._pos + holdLength + requestLength - 1);
		xhr.headers.set("Range", rangeHeader);
		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
			console.log("応答をうけとった。");
			// 読み込みデータがrequestLength未満だった場合はフラグをたてておいて、それ以上よみこめないようにしないとだめ。
			// 応答データからコンテンツサイズを拾っておきます。
			_this._size = /\/(\d+)/.exec(e.target.getResponseHeader("Content-Range"))[1]; // 相手のデータのサイズを取得できる。
			// 応答データをUint8Array化しておきます。
			var array = new Uint8Array(e.target.getResponse());
			_this._dlFinishFlg = array.length < requestLength;
			// データをうけとったので、_cacheBufferの内容を更新したいと思います。
			// まず今回応答があったxhrのオブジェクトが先頭のデータであるか調べます。
			// 先頭でなかった場合は追記できないので、_dlDataにcacheさせます。
			if(_this._dlData[0].xhr == xhr) {
				// 一番目のデータだった
				// 前からbufferを結合していきたいとおもいます。
				_this._dlData[0].data = array;
				// 前から順にデータを確認していって、結合していきます。
				var data = null;
				var arrays = [];
				var size = 0;
				// 残っているデータがある場合
				if(_this._cacheBuffer != null) {
					arrays.push(_this._cacheBuffer);
					size += _this._cacheBuffer.length;
				}
				while((data = _this._dlData.shift()) != null) {
					if(data.data == null) {
						// データ実体がないなら、結合できないので、前のデータはすてておく。
						_this._dlData.unshift(data);
					}
					else {
						size += data.data.length;
						arrays.push(data.data);
					}
				}
				// ここまできたら新しいcacheBufferをつくる
				_this._cacheBuffer = new Uint8Array(size);
				var pos = 0;
				arrays.forEach(function(e) {
					_this._cacheBuffer.set(e, pos);
					pos += e.length;
				});
				// ここまででarraysの準備がおわるはず。
//				console.log(com.ttProject.util.HexUtil.toHex(_this._cacheBuffer, true));
				// 準備ができたので、必要なデータを読み込みたい
				response();
			}
			else {
				// 一番目のデータではなかったので、cacheしておきます。
				for(var key in _this._dlData) {
					var data = _this._dlData[key];
					if(data.xhr == xhr) {
						data.data = array;
					}
				}
			}
		});
		// 要求をおくったので、次のデータの要求位置を変更しておきます。
		this._pos += length;
		// dlを実行するので、dlDataにデータを記載しておきます。
		this._dlData.push({xhr:xhr, data:null});
		xhr.send(this._url);
	}
	else {
		this._pos += length;
		// バッファがあり必要なデータをすでにDL済みの場合はそっちからデータを取り出して応答しておわりとなります。
		response();
	}
};
com.ttProject.channel.XhrIoReadChannel.prototype.close = function() {
	if(!this._accessFlg) {
		throw new Error("接続が破棄済みです。");
	}
	// これ以上アクセスしないようにします。
	this._accessFlg = false;
};
