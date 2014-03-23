goog.provide("com.ttProject.container.base.Reader");

/**
 * @constructor
 */
com.ttProject.container.base.Reader = function(selector) {
	this._selector = selector;
};

/**
 * selectorを参照します。
 * @returns
 */
com.ttProject.container.base.Reader.prototype.getSelector = function() {
	return this._selector;
};

/**
 * コンテナを読み込みます。
 * @param channel
 * @param callback
 */
com.ttProject.container.base.Reader.prototype.read = function(channel, callback) {
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
com.ttProject.container.base.Reader.prototype.getRemainData = function(callback) {
	callback(null);
};