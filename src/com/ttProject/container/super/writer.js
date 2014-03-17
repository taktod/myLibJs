goog.provide("com.ttProject.container.super.Writer");

/**
 * @constructor
 */
com.ttProject.container.super.Writer = function() {
	this._dataList = [];
};

/**
 * uint8Arrayデータを追加しておく。
 * @param data
 */
com.ttProject.container.super.Writer.prototype.append = function(data) {
	this._dataList.push(data);
};

com.ttProject.container.super.Writer.prototype.addContainer = function(unit) {
	
};

com.ttProject.container.super.Writer.prototype.addFrame = function(frame) {
	
};

com.ttProject.container.super.Writer.prototype.prepareHeader = function() {
	
};

com.ttProject.container.super.Writer.prototype.prepareTailer = function() {
	
};
