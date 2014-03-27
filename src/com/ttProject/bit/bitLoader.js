goog.provide("com.ttProject.bit.BitLoader");

goog.require("com.ttProject.channel.IReadChannel");
goog.require("com.ttProject.bit.base.Bit");
goog.require("com.ttProject.bit.base.BitN");
goog.require("com.ttProject.bit.base.ExpGolomb");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit6");
goog.require("com.ttProject.bit.Bit7");
goog.require("com.ttProject.bit.EbmlValue");
goog.require("com.ttProject.bit.Bit64");


/**
 * bitデータの読み込み補助
 * uint8Arrayからbitデータを順番に読み出します。
 * もしくは、channelをつくってそちらから読み出すか・・・
 * iReadChannelかその派生クラスから、bitデータを抜き出す動作
 * 普通にUint8Arrayから読み込んでもよさそうな気がした・・・
 * @constructor
 */
com.ttProject.bit.BitLoader = function(channel) {
	/**
	 * 動作バッファ
	 * IReadCHannelもしくはその継承クラス
	 */
	this._channel = channel;
	/**
	 * 処理途上バッファ
	 */
	this._floatData = 0;
	/**
	 * のこっているbit数
	 */
	this._left = 0;
	/**
	 * エンディアン指定フラグ
	 */
	this._littleEndianFlg = false;
	/**
	 * 応答を返す順番保持
	 */
	this._taskOrder = [];
};

com.ttProject.bit.BitLoader.prototype.setLittleEndianFlg = function(flg) {
	this._littleEndianFlg = flg;
};

com.ttProject.bit.BitLoader.prototype.isLittleEndian = function() {
	return this._littleEndianFlg;
};

com.ttProject.bit.BitLoader.prototype.getExtraBit = function(callback) {
	var bit = null;
	switch(this._left) {
	case 1:
		bit = new com.ttProject.bit.Bit1();
		break;
	case 2:
		bit = new com.ttProject.bit.Bit2();
		break;
	case 3:
		bit = new com.ttProject.bit.Bit3();
		break;
	case 4:
		bit = new com.ttProject.bit.Bit4();
		break;
	case 5:
		bit = new com.ttProject.bit.Bit5();
		break;
	case 6:
		bit = new com.ttProject.bit.Bit6();
		break;
	case 7:
		bit = new com.ttProject.bit.Bit7();
		break;
	default:
		callback(null);
		return;
	}
	this.load(bit, function() {
		callback(bit);
	});
};

/**
 * bits....
 * callback
 */
com.ttProject.bit.BitLoader.prototype.load = function() {
	/** レスポンスを保持しておいて、一番最後の応答のときに、callbackを発動するようにしておきたい。 */
	var _this = this;
	// 入力データ確認
	for(var i = 0;i < arguments.length;i ++) {
		var element = arguments[i];
		if(element instanceof Array) {
			// 中身がBitかもしれないので、分解して、bit化しておく。
			element.forEach(function(e) {
				if(e instanceof com.ttProject.bit.base.Bit) {
					_this._taskOrder.push(e);
				}
			});
		}
		else if(element instanceof com.ttProject.bit.base.Bit) {
			this._taskOrder.push(element);
		}
		else if(i == arguments.length - 1 && typeof element == "function") {
			this._taskOrder.push(element);
		}
		else {
			throw new Error("想定外の入力でした。");
		}
	}
	/**
	 * bit 読み込むbit
	 * callback 完了時の応答
	 */
	var load = function(bit, callback, resumed) {
		var pos = _this._channel.position();
		var floatData = _this._floatData;
		var left = _this._left;
		try {
			if(bit instanceof com.ttProject.bit.EbmlValue) {
				var ebml = bit;
				var bit1 = new com.ttProject.bit.Bit1();
				var loadBit1 = function() {
					// 読み込み実行したので、ebml.addBit1を実行する。
					if(ebml.addBit1(bit1)) {
						// もっかい読みこむ必要あり。
						load(bit1, loadBit1);
					}
					else {
						// もう読み込まなくてよい
						load(ebml.getDataBit(), function() {
							// 読み込みおわった？
							callback();
						});
					}
				};
				load(bit1, loadBit1);
			}
			else if(bit instanceof com.ttProject.bit.base.ExpGolomb) {
				var golomb = bit;
				var bit1 = new com.ttProject.bit.Bit1();
				var loadBit1 = function() {
					if(golomb.addBit1(bit1)) {
						load(bit1, loadBit1);
					}
					else {
						callback();
					}
				};
				load(bit1, loadBit1);
			}
			else {
				if(_this._littleEndianFlg) {
					throw new Error("littleEndianはあとで作る予定");
				}
				else {
					if(bit instanceof com.ttProject.bit.base.BitN) {
						var i = 0;
						var loadBigBit = function() {
							if(bit._bits.length > i) {
								load(bit._bits[i ++], loadBigBit);
							}
							else {
								callback();
							}
						};
						loadBigBit();
					}
					else {
						var setData = function(bit, callback) {
							var bitCount = bit.getBitCount();
							// ココかな・・・
							bit.set(_this._floatData >>> (_this._left - bitCount));
							_this._left -= bitCount;
							callback();
						};
						// なんBit読み込む必要があるか計算しなければならない。
						if(_this._left < bit.getBitCount()) {
							// 読み込もうとしたデータに足りない場合は、追加データの読み込みを実施しないとだめ。
							// 読み込むサイズを計算する。
							var size = Math.ceil((bit.getBitCount() - _this._left) / 8);
							_this._channel.read(size, function(data) {
								// 読み込んだデータを結合しないとだめ。
								for(var i = 0;i < data.length;i ++) {
									// floatDataがどうしても32bitになるらしい。
									_this._floatData = (_this._floatData << 8 | data[i] & 0xFF);
									_this._left += 8;
								}
								setData(bit, callback);
							});
						}
						else {
							setData(bit, callback);
						}
					}
				}
			}
		}
		catch(e) {
			// timeoutかけてからやり直す。
			// 余計な処理は呼び出さない方がよさそう。
			if(resumed) {
//				console.log(e);
				return;
			}
			setTimeout(function() {
				_this._channel.position(pos);
				_this._floatData = floatData;
				_this._left = left;
				load(bit, callback, true);
			}, 100);
		}
	};
	// load開始
	var next = function() {
		var obj = _this._taskOrder.shift();
		if(obj == undefined) {
		}
		else if(typeof obj == "function") {
			obj();
			next();
		}
		else {
			load(obj, next);
		}
	};
	next();
};