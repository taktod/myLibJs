goog.provide("com.ttProject.container.flv.FlvTagSelector");

goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.Bit16");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.container.flv.FlvHeaderTag");
goog.require("com.ttProject.container.flv.type.MetaTag");
goog.require("com.ttProject.container.flv.type.VideoTag");
goog.require("com.ttProject.container.flv.type.AudioTag");
goog.require("com.ttProject.container.flv.VideoCodecType");
goog.require("com.ttProject.container.flv.AudioCodecType");
goog.require("com.ttProject.frame.h264.DataNalAnalyzer");
goog.require("com.ttProject.frame.aac.AacDsiFrameAnalyzer");
goog.require("com.ttProject.frame.mp3.Mp3FrameAnalyzer");

/**
 * @constructor
 */
com.ttProject.container.flv.FlvTagSelector = function() {
	this._videoFrameAnalyzer = null;
	this._audioFrameAnalyzer = null;
};

com.ttProject.container.flv.FlvTagSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	var _this = this;
	var firstByte = new com.ttProject.bit.Bit8();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(firstByte, function() {
		switch(firstByte.get()) {
		case 0x46: // 'F'の場合は先頭のtagである可能性あり
			// 残りの2バイトも読み込んでおきたい。
			var signatureBit = new com.ttProject.bit.Bit16();
			loader.load(signatureBit, function() {
				var flvHeaderTag = new com.ttProject.container.flv.FlvHeaderTag(new com.ttProject.bit.Bit24(firstByte.get() << 16 | signatureBit.get()));
				flvHeaderTag.minimumLoad(channel, function() {
					callback(flvHeaderTag);
				});
			});
			break;
		case 0x09: // videoData
			var videoTag = new com.ttProject.container.flv.type.VideoTag(firstByte);
			videoTag.minimumLoad(channel, function() {
				// このタイミングでframeAnalyzerを決定しておきたいと思います。
				switch(videoTag.getCodec()) {
				case com.ttProject.container.flv.VideoCodecType.H264:
					if(_this._videoFrameAnalyzer == null || !(_this._videoFrameAnalyzer instanceof com.ttProject.frame.h264.DataNalAnalyzer)) {
						_this._videoFrameAnalyzer = new com.ttProject.frame.h264.DataNalAnalyzer();
					}
					break;
				default:
					throw new Error("コーデックがh264以外でした。");
				}
				videoTag.setFrameAnalyzer(_this._videoFrameAnalyzer);
				callback(videoTag);
			});
			break;
		case 0x08: // audioData
			var audioTag = new com.ttProject.container.flv.type.AudioTag(firstByte);
			audioTag.minimumLoad(channel, function() {
				// このタイミングでframeAnalyzerを決定しておきたい。aacかmp3のどちらかを対応します。
				switch(audioTag.getCodec()) {
				case com.ttProject.container.flv.AudioCodecType.AAC:
					if(_this._audioFrameAnalyzer == null || !(_this._audioFrameAnalyzer instanceof com.ttProject.frame.aac.AacDsiFrameAnalyzer)) {
						_this._audioFrameAnalyzer = new com.ttProject.frame.aac.AacDsiFrameAnalyzer();
						var audioSelector = _this._audioFrameAnalyzer.getSelector();
						audioSelector.setChannels(audioTag.getChannels());
						audioSelector.setSampleRate(audioTag.getSampleRate());
					}
					break;
				case com.ttProject.container.flv.AudioCodecType.MP3:
				case com.ttProject.container.flv.AudioCodecType.MP3_8:
					if(_this._audioFrameAnalyzer == null || !(_this._audioFrameAnalyzer instanceof com.ttProject.frame.mp3.Mp3FrameAnalyzer)) {
						_this._audioFrameAnalyzer = new com.ttProject.frame.mp3.Mp3FrameAnalyzer();
						var audioSelector = _this._audioFrameAnalyzer.getSelector();
						audioSelector.setChannels(audioTag.getChannels());
						audioSelector.setSampleRate(audioTag.getSampleRate());
					}
					break;
				default:
					throw new Error("コーデックが未対応です。");
				}
				audioTag.setFrameAnalyzer(_this._audioFrameAnalyzer);
				callback(audioTag);
			});
			break;
		case 0x12: // metaData
			var metaTag = new com.ttProject.container.flv.type.MetaTag(firstByte);
			metaTag.minimumLoad(channel, function() {
				callback(metaTag);
			});
			break;
		default:
			throw new Error("想定外のタグを受け取りました。");
		}
	});
};

