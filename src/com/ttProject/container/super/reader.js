goog.provide("com.ttProject.container.super.Reader");

/**
 * @constructor
 */
com.ttProject.container.super.Reader = function(selector) {
	this._selector = selector;
};

/**
 * selectorを参照します。
 * @returns
 */
com.ttProject.container.super.Reader.prototype.getSelector = function() {
	return this._selector;
};

/**
 * コンテナを読み込みます。
 * @param channel
 * @param callback
 */
com.ttProject.container.super.Reader.prototype.read = function(channel, callback) {
	this._selector.select(channel, function(container) {
		if(container != null) {
			container.load(channel, function() {
				callback(container);
			});
		}
		else {
			callback(container);
		}
	});
};

/**
 * 処理で残ったデータを参照します
 * @param callback
 */
com.ttProject.container.super.Reader.prototype.getRemainData = function(callback) {
	callback(null);
};