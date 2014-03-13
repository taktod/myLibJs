goog.provide("com.ttProject.frame.mp3.Mp3FrameSelector");

goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.frame.mp3.type.Id3Frame");
goog.require("com.ttProject.frame.mp3.type.Frame");

/**
 * @constructor
 */
com.ttProject.frame.mp3.Mp3FrameSelector = function() {
	
};

com.ttProject.frame.mp3.Mp3FrameSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	// まず始めの8bitを読み込んでみる。
	var firstByte = new com.ttProject.bit.Bit8();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(firstByte, function() {
		// 読み込みがおわったときの処理
		// firstByteからframeTypeを選択
		var frame = null;
		switch(firstByte.get()) {
		case 0x49: // 'I'
//			console.log("ID3Frame");
			frame = new com.ttProject.frame.mp3.type.Id3Frame();
			break;
		case 0x54: // 'T'
//			console.log("Tag");
//			break;
			throw new Error("Tagの動作は未実装です");
		case 0xFF: // frame
//			console.log("frame");
			frame = new com.ttProject.frame.mp3.type.Frame();
			break;
		default:
			console.log(firstByte.get());
			throw new Error("解析不能なデータです");
		}
//		console.log(frame);
		frame.minimumLoad(channel, callback);
	});
};