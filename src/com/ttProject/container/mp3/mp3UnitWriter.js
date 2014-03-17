goog.provide("com.ttProject.container.mp3.Mp3UnitWriter");

goog.require("com.ttProject.container.super.Writer");

/**
 * mp3frameからmp3を作成する動作
 * この動作は、frames (各frameのUint8Arrayを集めておく)からblobを最終的に作成して、そのblobを取り出せばよさそう。
 * 中途でblobを取り出すとそこまでに準備したデータが取り出せる感じにしておけばよいかな。
 * @constructor
 */
com.ttProject.container.mp3.Mp3UnitWriter = function() {
	goog.base(this);
};

goog.inherits(com.ttProject.container.mp3.Mp3UnitWriter, com.ttProject.container.super.Writer);
