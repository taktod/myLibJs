goog.provide("com.ttProject.container.base.Unit");

/**
 * メディアデータの基本となるunit
 * @constructor
 */
com.ttProject.container.base.Unit = function() {
	/** 保持データ実体(uint8Array) */
	this._data;
	/** 保持データサイズ(保持すべきデータ量というのもあり) */
	this._size;
	/** pts値(presentationTimestamp) */
	this._pts;
	/** timebase(ptsが何秒を表しているか・・・1000→1ミリ秒 1000000→1マイクロ秒) */
	this._timebase;
};

com.ttProject.container.base.Unit.prototype.setData = function(data) {
	this._data = data;
};

com.ttProject.container.base.Unit.prototype.getData = function() {
	// データを再生成していない場合は、作り直す動作がほしいところ。(メモリーがもったいないので、毎回作り直すか？)
	return this._data;
};

com.ttProject.container.base.Unit.prototype.setPts = function(pts) {
	this._pts = pts;
};

com.ttProject.container.base.Unit.prototype.getPts = function() {
	return this._pts;
};

com.ttProject.container.base.Unit.prototype.setTimebase = function(timebase) {
	this._timebase = timebase;
};

com.ttProject.container.base.Unit.prototype.getTimebase = function() {
	return this._timebase;
};

com.ttProject.container.base.Unit.prototype.setSize = function(size) {
	this._size = size;
};

com.ttProject.container.base.Unit.prototype.getSize = function() {
	return this._size;
};
