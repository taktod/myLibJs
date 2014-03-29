goog.provide("com.ttProject.container.mkv.MkvBlockTag");

goog.require("com.ttProject.container.mkv.MkvBinaryTag");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.EbmlValue");
goog.require("com.ttProject.bit.Bit16");
goog.require("com.ttProject.channel.Uint8ReadChannel");
goog.require("com.ttProject.container.mkv.LacingType");
goog.require("com.ttProject.util.StackUtil");

/**
 * simpleBlockやBlockTag共通の動作をつくっておきます。
 * @constructor
 */
com.ttProject.container.mkv.MkvBlockTag = function(id, size) {
	goog.base(this, id, size);
	this._trackId = new com.ttProject.bit.EbmlValue(); // ebmlValue
	this._timestampDiff = new com.ttProject.bit.Bit16(); // bit16
	this._time = 0;
	this._frame = null;
};

goog.inherits(com.ttProject.container.mkv.MkvBlockTag, com.ttProject.container.mkv.MkvBinaryTag);

com.ttProject.container.mkv.MkvBlockTag.prototype.minimumLoad = function(channel, callback) {
	var _this = this;
	// TODO なぜかmkvの始めのframeのpts値が0ではなくなるバグがあるらしい・・・
	// 原因は不明ですが、avconvの出力がそうなってる。
	goog.base(this, "minimumLoad", channel, function() {
		var loader = new com.ttProject.bit.BitLoader(channel);
		loader.load(_this._trackId, _this._timestampDiff, callback);
	});
};

com.ttProject.container.mkv.MkvBlockTag.prototype.load = function(channel, callback) {
	var _this = this;
	// フレームを解析する
	var lacingSizeList = [];
	// 内部のフレーム個々のデータを解析します。
	var analyzeFrame = function(entry, channel) {
		// analyzerを取りだす。
		var frameAnalyzer = entry.getFrameAnalyzer();
		frameAnalyzer.analyze(channel, function(frame) {
//			console.log(frame);
			// 取得したframeにtimebase pts値を追加しておく。
			frame.setTimebase(entry.getTimebase());
			frame.setPts(_this._time);
			_this._frame = frame;
		});
	};
	// encodingについて調整しておく。(先頭に特定のデータがくっつくとか)
	var checkEncodingFrames = function() {
		// とりあえず、encodingデータが設定されている場合の動作は想定外
		var pos = 0;
		var data = _this.getMkvData();
		var reader = _this.getMkvTagReader();
		var entry = reader.getTrackEntry(_this.getTrackId().get());
		lacingSizeList.forEach(function(size) {
			var channel = new com.ttProject.channel.Uint8ReadChannel(data.subarray(pos, pos + size));
			pos += size;
			analyzeFrame(entry, channel);
		});
		com.ttProject.util.StackUtil.call(callback);
//		callback();
	};
	// 内部データの分割lacingについて調査する。(分割サイズを計算しておく)
	var setupLacing = function() {
//		var channel = new com.ttProject.channel.Uint8ReadChannel(_this.getMkvData());
		switch(_this.getLacingType()) {
		case com.ttProject.container.mkv.LacingType.No:
			lacingSizeList.push(_this.getMkvData().length);
			checkEncodingFrames();
			return;
		case com.ttProject.container.mkv.LacingType.Xiph:
			break;
		case com.ttProject.container.mkv.LacingType.EBML:
			break;
		case com.ttProject.container.mkv.LacingType.FixedSize:
			break;
		default:
			break;
		}
		throw new Error("解析不能なlacingタイプを取得しました。");
	};
	goog.base(this, "load", channel, function() {
		// clusterTimeの参照はまだつくってないはず
		_this._time = _this.getMkvTagReader().getClusterTime() + _this._timestampDiff.get();
//		console.log(_this._time);
		// このタイミングでframeの読み込みを実施しておきたい。
		setupLacing();
	});
};

com.ttProject.container.mkv.MkvBlockTag.prototype.getRemainedSize = function() {
	return this.getMkvSize();
};

com.ttProject.container.mkv.MkvBlockTag.prototype.getTrackId = function() {
	return this._trackId;
};

com.ttProject.container.mkv.MkvBlockTag.prototype.getFrame = function() {
	return this._frame;
};