goog.provide("com.ttProject.bit.BitConnector");

goog.require("com.ttProject.bit.super.ExpGolomb");
goog.require("com.ttProject.bit.super.BitN");
goog.require("com.ttProject.bit.EbmlValue");

/**
 * bitデータを接続するクラス
 */
/**
 * @constructor
 */
com.ttProject.bit.BitConnector = function() {
	this.bits = [];
	this.littleEndianFlg = false;
	this.data = null;
	this.left = null;
	this.size = null;
	this.buffer = null;
};
// 内部変数
/**
 * Littleエンディアンとして結合を実施するかフラグ設定
 */
com.ttProject.bit.BitConnector.prototype.setLittleEndianFlg = function(flg) {
	this.littleEndianFlg = flg;
};
/**
 * littleEndianとして処理するかフラグ参照
 * @returns {Boolean}
 */
com.ttProject.bit.BitConnector.prototype.isLittleEndian = function() {
	return this.littleEndianFlg;
};
/**
 * 接続してuint8Arrayで応答します。
 */
com.ttProject.bit.BitConnector.prototype.connect = function() {
	var _this = this;
	/**
	 * バッファの書き込み実施
	 */
	var writeBuffer = function(shift) {
		if(this.littleEndianFlg) {
			_this.buffer.push(_this.data & 0xFF);
		}
		else {
			_this.buffer.push((_this.data >>> shift) & 0xFF);
		}
	};
	/**
	 * bitデータを追記する
	 */
	var appendBit = function(bit) {
		if(_this.littleEndianFlg) {
			_this.data = _this.data | (bit.get() << _this.left);
			_this.left = bit.getBitCount();
			while(_this.left >= 8) {
				_this.left -= 8;
				writeBuffer(0);
				_this.data >>>= 8;
			}
		}
		else {
			_this.data = (_this.data << bit.getBitCount()) | bit.get();
			_this.left += bit.getBitCount();
			while(_this.left >= 8) {
				_this.left -= 8;
				writeBuffer(_this.left);
			}
		}
	};
	var bits = arguments;
	this.data = 0;
	this.left = 0;
	this.size = 0;
	this.buffer = [];
	for(var i = 0;i < bits.length;i ++) {
		var bit = bits[i];
		if(bit instanceof com.ttProject.bit.super.ExpGolomb) {
			var eg = bit;
			var egBits = eg.bits;
			for(var j = 0;j < egBits.length;j ++) {
				var egBit = egBits[j];
				appendBit(egBit);
			}
		}
		else if(bit instanceof com.ttProject.bit.EbmlValue) {
			var ebml = bit;
			appendBit(ebml.getEbmlNumBit());
			var dataBit = ebml.getEbmlDataBit();
			if(dataBit instanceof com.ttProject.bit.super.BitN) {
				var bitN = dataBit;
				if(this.littleEndianFlg) {
					for(var j = bitN.bits.length - 1;j >= 0;j --) {
						appendBit(bitN.bits[j]);
					}
				}
				else {
					for(var j = 0;j < bitN.bits.length;j ++) {
						appendBit(bitN.bits[j]);
					}
				}
			}
			else {
				appendBit(dataBit);
			}
		}
		else if(bit instanceof com.ttProject.bit.super.BitN) {
			var bitN = bit;
			if(this.littleEndianFlg) {
				for(var j = bitN.bits.length - 1;j >= 0;j --) {
					appendBit(bitN.bits[j]);
				}
			}
			else {
				for(var j = 0;j < bitN.bits.length;j ++) {
					appendBit(bitN.bits[j]);
				}
			}
		}
		else {
			appendBit(bit);
		}
	}
	// 端数bitがでたときに、最終データの埋め合わせをしなければならない。
	return new Uint8Array(this.buffer);
};
