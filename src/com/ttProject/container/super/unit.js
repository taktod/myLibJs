goog.provide(com.ttProject.container.super.Unit);

/**
 * メディアデータの基本となるunit
 * @constructor
 */
com.ttProject.container.super.Unit = function() {
	/** 保持データ実体(uint8Array) */
	this._data;
	/** pts値(presentationTimestamp) */
	this._pts;
	/** timebase(ptsが何秒を表しているか・・・1000→1ミリ秒 1000000→1マイクロ秒) */
	this._timebase;
};

com.ttProject.container.super.Unit.prototype.setData = function(data) {
	this._data = data;
};

com.ttProject.container.super.Unit.prototype.getData = function() {
	return this._data;
};

com.ttProject.container.super.Unit.prototype.setPts = function(pts) {
	this._pts = pts;
};

com.ttProject.container.super.Unit.prototype.getPts = function() {
	return this._pts;
};

com.ttProject.container.super.Unit.prototype.setTimebase = function(timebase) {
	this._timebase = timebase;
};

com.ttProject.container.super.Unit.prototype.getTimebase = function() {
	return this._timebase;
};
