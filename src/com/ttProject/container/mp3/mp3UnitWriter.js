goog.provide("com.ttProject.container.mp3.Mp3UnitWriter");

goog.require("com.ttProject.container.base.Writer");
goog.require("com.ttProject.frame.mp3.type.Frame");

/**
 * mp3frameからmp3を作成する動作
 * この動作は、frames (各frameのUint8Arrayを集めておく)からblobを最終的に作成して、そのblobを取り出せばよさそう。
 * 中途でblobを取り出すとそこまでに準備したデータが取り出せる感じにしておけばよいかな。
 * @constructor
 */
com.ttProject.container.mp3.Mp3UnitWriter = function() {
	goog.base(this);
	this._frameList = [];
};

goog.inherits(com.ttProject.container.mp3.Mp3UnitWriter, com.ttProject.container.base.Writer);

/**
 * コンテナを追加する
 * @param mp3Unit
 */
com.ttProject.container.mp3.Mp3UnitWriter.prototype.addContainer = function(mp3Unit) {
	this.addFrame(mp3Unit.getFrame());
};

/**
 * フレームを追加する
 * @param mp3Frame
 */
com.ttProject.container.mp3.Mp3UnitWriter.prototype.addFrame = function(mp3Frame) {
	if(mp3Frame instanceof com.ttProject.frame.mp3.type.Frame) {
		this._frameList.push(mp3Frame.getData());
	}
};

/**
 * データblobを取得する。
 */
com.ttProject.container.mp3.Mp3UnitWriter.prototype.getBlob = function() {
	return new Blob(this._frameList, {type: "audio/mp3"});
};