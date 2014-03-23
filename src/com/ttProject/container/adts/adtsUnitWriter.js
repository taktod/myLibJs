goog.provide("com.ttProject.container.adts.AdtsUnitWriter");

goog.require("com.ttProject.container.base.Writer");

/**
 * @constructor
 */
com.ttProject.container.adts.AdtsUnitWriter = function() {
	goog.base(this);
	this._frameList = [];
};

goog.inherits(com.ttProject.container.adts.AdtsUnitWriter, com.ttProject.container.base.Writer);

com.ttProject.container.adts.AdtsUnitWriter.prototype.addContainer = function(adtsUnit) {
	this.addFrame(adtsUnit.getFrame());
};

com.ttProject.container.adts.AdtsUnitWriter.prototype.addFrame = function(aacFrame) {
	this._frameList.push(aacFrame.getData());
};

com.ttProject.container.adts.AdtsUnitWriter.prototype.getBlob = function() {
	return new Blob(this._frameList, {type: "audio/adts"});
};
