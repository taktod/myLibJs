goog.provide("com.ttProject.container.base.Writer");

/**
 * @constructor
 */
com.ttProject.container.base.Writer = function() {
	this._dataList = [];
};

/**
 * uint8Arrayデータを追加しておく。
 * @param data
 */
com.ttProject.container.base.Writer.prototype.append = function(data) {
	this._dataList.push(data);
};

com.ttProject.container.base.Writer.prototype.addContainer = function(unit) {
	
};

com.ttProject.container.base.Writer.prototype.addFrame = function(frame) {
	
};

com.ttProject.container.base.Writer.prototype.prepareHeader = function() {
	
};

com.ttProject.container.base.Writer.prototype.prepareTailer = function() {
	
};

com.ttProject.container.base.Writer.prototype.getBlob = function() {
	
};