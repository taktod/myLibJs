goog.provide("com.ttProject.ms.mp4.h264.Manager");

goog.require("com.ttProject.frame.h264.ConfigData");
goog.require("com.ttProject.util.HexUtil");

/**
 * @constructor
 */
com.ttProject.ms.mp4.h264.Manager = function(mediaSource) {
	// keyFrameから次のkeyFrameまでデータをあつめていきます。
	this._mediaSource = mediaSource; // 動作対象mediaSource
	this._sourceBuffer = null; // 動作sourceBuffer
	this._frames = [];
	this._sps = null;
	this._pps = null;
};

/**
 * frameを追記する
 * @param frame
 */
com.ttProject.ms.mp4.h264.Manager.prototype.appendFrame = function(frame) {
	// spsとppsを取り出してデータを確認する。
	if(this._sps == null || this._pps == null) {
		// spsとppsが変更されている場合はh264データが更新されているので、以前のmediaSourceを破棄する必要がありそう。
		// とりあえず初入力をベースにheaderをつくる動作は必要なので、さくっとつくっておきたい。
		
		// 初データなので、spsとppsからheaderFrameをつくって、msに投入する必要あり。
		// headerを作成する必要あり。
		// とりあえず無理矢理つくろう。
		// まずconfigDataをつくることで、全体のsizeが決定します。
		// moovSize
		// trakSize
		// mediaSize
		// minfSize
		// stblSize
		// stsdSize
		// avcCSize
		/*
		000000106674797069736F6D00000200
		moovSize6D6F6F760000006C6D766864000000000000000000000000timescal
		0000000000010000010000000000000000000000000100000000000000000000
		0000000000010000000000000000000000000000400000000000000000000000
		0000000000000000000000000000000000000001000000286D76657800000020
		74726578000000000000000100000001000000210000000000010000
		trakSize7472616B0000005C746B68640000000F000000000000000000000001
		0000000000000000000000000000000000000000000000000001000000000000
		00000000000000000001000000000000000000000000000040000000widt0000
		heig0000
		mdiaSize6D646961000000206D646864000000000000000000000000timescal
		0000000055C400000000002A68646C7200000000000000007669646500000000
		0000000000000000747450726F6A65637400
		minfSize6D696E6600000014766D686400000001000000000000000000000024
		64696E660000001C6472656600000000000000010000000C75726C2000000001
		stblSize7374626C000000107374747300000000000000000000001073747363
		0000000000000000000000147374737A00000000000000000000000000000010
		7374636F0000000000000000
		stsdSize73747364000000000000000100000086617663310000000000000001
		00000000000000000000000000000000widtheig004800000048000000000000
		0001000000000000000000000000000000000000000000000000000000000000
		00000018FFFF
		avcCSizeConfigデータ
		*/
		var configData = new com.ttProject.frame.h264.ConfigData();
		var cd = configData.makeConfigData(frame.getSps(), frame.getPps());
		var moovSize = 0x24C + cd.length;
		var trakSize = 0x1B0 + cd.length;
		var mdiaSize = 0x14C + cd.length;
		var minfSize = 0xFA + cd.length;
		var stblSize = 0xBA + cd.length;
		var stsdSize = 0x6E + cd.length;
		var avcCSize = 0x8 + cd.length;
		var base = "000000106674797069736F6D00000200000000006D6F6F760000006C6D766864000000000000000000000000000003E8000000000001000001000000000000000000000000010000000000000000000000000000000100000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000286D7665780000002074726578000000000000000100000001000000210000000000010000000001D87472616B0000005C746B68640000000F0000000000000000000000010000000000000000000000000000000000000000000000000001000000000000000000000000000000010000000000000000000000000000400000000280000001680000000001746D646961000000206D646864000000000000000000000000000003E80000000055C400000000002A68646C72000000000000000076696465000000000000000000000000747450726F6A65637400000001226D696E6600000014766D68640000000100000000000000000000002464696E660000001C6472656600000000000000010000000C75726C2000000001000000E27374626C0000001073747473000000000000000000000010737473630000000000000000000000147374737A000000000000000000000000000000107374636F000000000000000000000096737473640000000000000001000000866176633100000000000000010000000000000000000000000000000002800168004800000048000000000000000100000000000000000000000000000000000000000000000000000000000000000018FFFF0000003061766343";
		var data = com.ttProject.util.HexUtil.makeBuffer(base);
		var header = new Uint8Array(0x25C + cd.length);
		// 基本データ設定
		header.set(data);
		// avcC設定
		header.set(cd, 0x25C);
		var dataView = new DataView(header.buffer);
		// 各atomのsize設定
		dataView.setUint32(0x10, moovSize);
		dataView.setUint32(0xAC, trakSize);
		dataView.setUint32(0x110, mdiaSize);
		dataView.setUint32(0x162, minfSize);
		dataView.setUint32(0x1A2, stblSize);
		dataView.setUint32(0x1EE, stsdSize);
		dataView.setUint32(0x254, avcCSize);
		// timebase設定
		dataView.setUint32(0x2C, frame.getTimebase());
		dataView.setUint32(0x12C, frame.getTimebase());
		// width設定
		dataView.setUint16(0x108, frame.getWidth());
		dataView.setUint16(0x21E, frame.getWidth());
		// height設定
		dataView.setUint16(0x10C, frame.getHeight());
		dataView.setUint16(0x220, frame.getHeight());
		console.log(com.ttProject.util.HexUtil.toHex(header, true));
		// このheaderの値がsourceBufferに投入すべき初データになる予定。
		// sourceBuffer用のcodec値
		var codecs = "avc1." + com.ttProject.util.HexUtil.toHex(cd.subarray(1,4));
		console.log(codecs);
		
		// msからsourceBufferをつくる必要あり。
		this._sourceBuffer = this._mediaSource.addSourceBuffer('video/mp4; codecs="' + codecs + '"');
		this._sourceBuffer.appendBuffer(header);
		// sourceBufferの準備おわり。
	}
	// headerができたら、keyFrame + innerFrameの組をためていく。
	// 次のkeyFrameを投入したらいままでのグループをmp4のmoof + mdatに変換して流し込む
	// これをやっておけば、再生可能な状況にできると思われる。
};
