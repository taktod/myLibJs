goog.provide("com.ttProject.container.mkv.MkvTagReader");

goog.require("com.ttProject.container.base.Reader");
goog.require("com.ttProject.container.mkv.MkvTagSelector");

goog.require("com.ttProject.container.mkv.type.Segment");
goog.require("com.ttProject.container.mkv.type.Cluster");
goog.require("com.ttProject.container.mkv.type.TimecodeScale");
goog.require("com.ttProject.container.mkv.type.Timecode");
goog.require("com.ttProject.container.mkv.type.TrackEntry");

/**
 * trackEntryを保持させておいて、どういうコーデックであるか判定できるようにしておいた方がよさげ。
 * trackEntryの情報とdefaultTimebase値
 * 処理途上のclusterTime値の保持が必須っぽいですね。
 * @constructor
 */
com.ttProject.container.mkv.MkvTagReader = function() {
	goog.base(this, new com.ttProject.container.mkv.MkvTagSelector());
	// trackEntryのデータ保持用連想配列
	this._trackEntryMap = {};
	// デフォルトのtimebase値
	this._defaultTimebase = 1000;
	// 現在読み込み中のクラスタの時間データ
	this._clusterTime = 0;
};

goog.inherits(com.ttProject.container.mkv.MkvTagReader, com.ttProject.container.base.Reader);

com.ttProject.container.mkv.MkvTagReader.prototype.read = function(channel, callback) {
	var _this = this;
	this.getSelector().select(channel, function(container) {
		container.setMkvTagReader(_this);
		// clusterやsegmentでないなら、loadを実行すべき
		if(container instanceof com.ttProject.container.mkv.type.Segment
			|| container instanceof com.ttProject.container.mkv.type.Cluster) {
			callback(container);
			return;
		}
		container.load(channel, function() {
			// loadを実行した場合
			if(container instanceof com.ttProject.container.mkv.type.TimecodeScale) {
				_this._defaultTimebase = container.getTimebaseValue();
			}
			if(container instanceof com.ttProject.container.mkv.type.TrackEntry) {
				// trackEntryを保持
				var id = container.setupEntry();
				_this._trackEntryMap[id] = container;
			}
			if(container instanceof com.ttProject.container.mkv.type.Timecode) {
				_this._clusterTime = container.getValue();
			}
			callback(container);
		});
	});
};

com.ttProject.container.mkv.MkvTagReader.prototype.getClusterTime = function() {
	return this._clusterTime;
};
