goog.provide("com.ttProject.bit.BitConnector");

goog.require("com.ttProject.bit.super.ExpGolomb");
goog.require("com.ttProject.bit.super.BitN");
goog.require("com.ttProject.bit.EbmlValue");

/**
 * bitの結合動作
 */
(function(path){
	/**
	 * @constructor
	 */
	path.BitConnector = function() {
		this.bits = [];
		this.littleEndianFlg = false;
		this.data = null;
		this.left = null;
		this.size = null;
		this.buffer = null;
	};
	path.BitConnector.prototype.bits = null;
	path.BitConnector.prototype.littleEndianFlg = null;
	// 内部変数
	path.BitConnector.prototype.data = null;
	path.BitConnector.prototype.left = null;
	path.BitConnector.prototype.size = null;
	path.BitConnector.prototype.buffer = null;
	path.BitConnector.prototype.setLittleEndianFlg = function(flg) {
		this.littleEndianFlg = flg;
	};
	path.BitConnector.prototype.isLittleEndian = function() {
		return this.littleEndianFlg;
	};
	/**
	 * 接続してuint8Arrayで応答します。
	 */
	path.BitConnector.prototype.connect = function() {
		var bits = arguments;
		this.data = 0;
		this.left = 0;
		this.size = 0;
		this.buffer = [];
		for(var i = 0;i < bits.length;i ++) {
			var bit = bits[i];
			if(bit instanceof path.super.ExpGolomb) {
				var eg = bit;
				var egBits = eg.bits;
				for(var j = 0;j < egBits.length;j ++) {
					var egBit = egBits[j];
					this.appendBit(egBit);
				}
			}
			else if(bit instanceof path.EbmlValue) {
				var ebml = bit;
				this.appendBit(ebml.getEbmlNumBit());
				var dataBit = ebml.getEbmlDataBit();
				if(dataBit instanceof path.super.BitN) {
					var bitN = dataBit;
					if(this.littleEndianFlg) {
						for(var j = bitN.bits.length - 1;j >= 0;j --) {
							this.appendBit(bitN.bits[j]);
						}
					}
					else {
						for(var j = 0;j < bitN.bits.length;j ++) {
							this.appendBit(bitN.bits[j]);
						}
					}
				}
				else {
					this.appendBit(dataBit);
				}
			}
			else if(bit instanceof path.super.BitN) {
				var bitN = bit;
				if(this.littleEndianFlg) {
					for(var j = bitN.bits.length - 1;j >= 0;j --) {
						this.appendBit(bitN.bits[j]);
					}
				}
				else {
					for(var j = 0;j < bitN.bits.length;j ++) {
						this.appendBit(bitN.bits[j]);
					}
				}
			}
			else {
				this.appendBit(bit);
			}
		}
		// 端数bitがでたときに、最終データの埋め合わせをしなければならない。
		return new Uint8Array(this.buffer);
	};
	path.BitConnector.prototype.appendBit = function(bit) {
		if(this.littleEndianFlg) {
			this.data = this.data | (bit.get() << this.left);
			this.left = bit.getBitCount();
			while(this.left >= 8) {
				this.left -= 8;
				this.writeBuffer(0);
				this.data >>>= 8;
			}
		}
		else {
			this.data = (this.data << bit.getBitCount()) | bit.get();
			this.left += bit.getBitCount();
			while(this.left >= 8) {
				this.left -= 8;
				this.writeBuffer(this.left);
			}
		}
	};
	path.BitConnector.prototype.writeBuffer = function(shift) {
		if(this.littleEndianFlg) {
			this.buffer.push(this.data & 0xFF);
		}
		else {
			this.buffer.push((this.data >>> shift) & 0xFF);
		}
	};
})(com.ttProject.bit);
