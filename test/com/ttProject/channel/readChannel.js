goog.provide("com.ttProject.channel.ReadChannel");

goog.require("com.ttProject.channel.IReadChannel");

goog.require("com.ttProject.channel.JavaFileReadChannel");
goog.require("com.ttProject.channel.XhrIoReadChannel");

/**
 * @constructor
 * @implements {IReadChannel}
 */
com.ttProject.channel.ReadChannel = function(target) {
	if(typeof jcom == "undefined") {
		this._channel = new com.ttProject.channel.XhrIoReadChannel(target);
	}
	else {
		this._channel = new com.ttProject.channel.JavaFileReadChannel(target);
	}
};

goog.inherits(com.ttProject.channel.ReadChannel, com.ttProject.channel.IReadChannel);

com.ttProject.channel.ReadChannel.prototype.isOpen = function() {
	return this._channel.isOpen();
};

com.ttProject.channel.ReadChannel.prototype.size = function() {
	return this._channel.size();
};

com.ttProject.channel.ReadChannel.prototype.position = function(position) {
	return this._channel.position(position);
};

com.ttProject.channel.ReadChannel.prototype.read = function(length, callback) {
	return this._channel.read(length, callback);
};

com.ttProject.channel.ReadChannel.prototype.close = function() {
	return this._channel.close();
};

