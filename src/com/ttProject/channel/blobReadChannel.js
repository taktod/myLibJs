goog.provide("com.ttProject.channel.BlobReadChannel");

goog.require("com.ttProject.channel.IReadChannel");

/**
 * @constructor
 */
com.ttProject.channel.BlobReadChannel = function(blob) {
	this._blob = blob;
	this._position = 0;
};
