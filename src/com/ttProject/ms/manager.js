goog.provide("com.ttProject.ms.Manager");
goog.provide("com.ttProject.ms.Type");

goog.require("com.ttProject.channel.BlobReadChannel");
goog.require("com.ttProject.channel.XhrIoReadChannel");

goog.require("com.ttProject.container.flv.FlvTagReader");
goog.require("com.ttProject.frame.base.AudioFrame");
goog.require("com.ttProject.frame.base.VideoFrame");
goog.require("com.ttProject.frame.h264.H264Frame");
goog.require("com.ttProject.frame.aac.AacFrame");
goog.require("com.ttProject.frame.mp3.Mp3Frame");

goog.require("com.ttProject.ms.mp4.h264.Manager");

/**
 * MediaSourceの動作の全体を管理するマネージャー
 * ここにメディアファイルを設定すると設定をurlを取り出せて、そのurlをvideoタグやaudioタグにくっつけておくと、そのまま再生可能になる。
 * みたいな
 * シークしたらその部分が先にDLできて・・・というオプションも欲しいですね。(できたらあとでやればいいかな。)
 * あとは適当なイベントも必要か・・・
 * @constructor
 * @param target 動作対象データ(file or blob or url)
 * @param type データタイプ(mkv flv mpegts mp4 ... 設定しない場合は拡張子を頼りにします。)
 */
com.ttProject.ms.Manager = function(target, type) {
	// とりあえず動作できるかとかしっておく必要あり。
	var MediaSource = window["MediaSource"] || window["WebKitMediaSource"];
	if(!!!MediaSource) {
		// TODO mediaSourceが動作できないなら、blobをつくって、それを設定してもいいかも・・・
		// ただし中途ダウンロードでの再生開始とかできなくなるけど・・・
		throw new Error("mediaSourceが取得できませんでした。");
	}
	this._ms = new MediaSource();
	this._msManagers = {}; // メッセージマネージャー一覧 id => manager
	if(target instanceof Blob) {
		this._channel = new com.ttProject.channel.BlobReadChannel(target);
	}
	else {
		this._channel = new com.ttProject.channel.XhrIoReadChannel(target);
	}
	if(type == undefined) {
		if(target instanceof Blob) {
			switch(target.type) {
			case "video/x-flv":
				// flvの場合
				break;
			}
		}
		else {
			switch(target.split("?")[0].substr(-3)) {
			case "mp3":
				throw new Error("mp3はまだつくってません");
			case "mp4":
				throw new Error("mp4はまだつくってません");
			case "flv":
				this._reader = new com.ttProject.container.flv.FlvTagReader();
				break;
			case ".ts":
				throw new Error("mpegtsはまだつくってません");
			case "mkv":
				throw new Error("mkvはまだつくってません");
			case "adts":
			case "aac":
				throw new Error("aacはまだつくってません");
			}
		}
	}
	else {
		// typeに従う
	}// */
	// mediaSourceが利用可能であるかしっておく必要あり。
	// mediaデータの内部がどうなっているしっておく必要あり。(dlしてから初めてわかる部分だが・・・)
	// データはダウンロードしてみないとわからない・・・か・・・
	// とりあえず拡張子で、とりいそぎの動作はなんであるかわからないとだめっぽいですね。
	// それとも先頭のDLでなんであるかわかるようにしておくとか？
	// sourceが開いたら処理を開始する。
	// sourceが開くことができたら、データを確認していく。
	var _this = this;
	var openLoop = function() {
		// 開いたら動作開始、mediaSourceに必要なデータをつっこんでいく。
		_this._reader.read(_this._channel, function(unit) {
			console.log(unit);
			if(unit.getFrame == undefined || unit.getFrame() == null) {
				openLoop();
				return;
			}
			var frame = unit.getFrame();
			if(_this._msManagers[frame.getId()] == undefined) {
				// 動作マネージャーが決定していない場合
				if(frame instanceof com.ttProject.frame.base.VideoFrame) {
					if(frame instanceof com.ttProject.frame.h264.H264Frame) {
						// h264frameの場合
						_this._msManagers[frame.getId()] = new com.ttProject.ms.mp4.h264.Manager(_this._ms);
					}
/*					else if(frame instanceof com.ttProject.frame.vp8.vp8Frame) {
						// vp8frameの場合
					}*/
					else {
						throw new Error("想定外のフレームでした。");
					}
				}
				else if(frame instanceof com.ttProject.frame.base.AudioFrame) {
/*					if(frame instanceof com.ttProject.frame.mp3.Mp3Frame) {
						
					}
					else if(frame instanceof com.ttProject.frame.aac.AacFrame) {
						
					}
/*					else if(frame instanceof com.ttProject.frame.vorbis.VorbisFrame) {
					}*/
/*					else {
						throw new Error("想定外のフレームでした。");
					}*/
					openLoop();
					return;
				}
			}
			_this._msManagers[frame.getId()].appendFrame(frame);
			setTimeout(openLoop, 10);
//			openLoop();
		});// */
		// 拡張子にしたがって、データを読み取ればよしか？
		// で、再生可能にすればよし。
		// ループして、tagを読み込んでいけばよし。
	};
	this._ms.addEventListener("sourceopen", openLoop, false);
	this._ms.addEventListener("webkitsourceopen", openLoop, false);
};

com.ttProject.ms.Manager.prototype.getUrl = function() {
	// 動作URLを応答します
	return window.URL.createObjectURL(this._ms);
};

/**
 * @enum string
 */
com.ttProject.ms.Type = {
	FLV:    "flv",
	MP4:    "mp4",
	MPEGTS: "ts",
	MKV:    "mkv",
	MP3:    "mp3",
	ADTS:   "aac",
	AAC:    "aac"
};

