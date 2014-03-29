goog.provide("com.ttProject.container.mkv.MkvTagReader");

goog.require("com.ttProject.container.base.Reader");
goog.require("com.ttProject.container.mkv.MkvTagSelector");
goog.require("com.ttProject.container.mkv.type.Segment");
goog.require("com.ttProject.container.mkv.type.Cluster");

/**
 * trackEntryを保持させておいて、どういうコーデックであるか判定できるようにしておいた方がよさげ。
 * trackEntryの情報とdefaultTimebase値
 * 処理途上のclusterTime値の保持が必須っぽいですね。
 * @constructor
 */
com.ttProject.container.mkv.MkvTagReader = function() {
	goog.base(this, new com.ttProject.container.mkv.MkvTagSelector());
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
			callback(container);
		});
	});
};
