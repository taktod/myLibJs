goog.provide("com.ttProject.bit.BitLoader");

goog.require("com.ttProject.channel.IReadChannel");
goog.require("com.ttProject.bit.super.Bit");
goog.require("com.ttProject.bit.super.BitN");
goog.require("com.ttProject.bit.super.ExpGolomb");
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
		return null;
	}
	this.load(bit, callback);
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
		if(element instanceof com.ttProject.bit.super.Bit) {
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
	var load = function(bit, callback) {
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
		else if(bit instanceof com.ttProject.bit.super.ExpGolomb) {
			var golomb = bit;
			var bit1 = null;
			do {
				bit1 = new com.ttProject.bit.Bit1();
				load(bit1);
			} while(golomb.addBit1(bit1));
		}
		else {
			if(_this._littleEndianFlg) {
				throw new Error("littleEndianはあとで作る予定");
//				while(this.left < bit.getBitCount()) {
//				}
			}
			else {
				if(bit instanceof com.ttProject.bit.super.BitN && bit.getBitCount() > 64) {
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
//					for(var i = 0;i < bit._bits.length;i ++) {
//						console.log(bit._bits[i]);
//					}
//					throw new Error("64bit以上のデータ読み込みはとりあえずあとまわし");
				}
				else {
					var setData = function(bit, callback) {
						var bitCount = bit.getBitCount();
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