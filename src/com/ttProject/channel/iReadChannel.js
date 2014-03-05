goog.provide("com.ttProject.channel.IReadChannel");

/**
 * @interface
 */
com.ttProject.channel.IReadChannel = function() {};
com.ttProject.channel.IReadChannel.prototype.isOpen   = function() {};
com.ttProject.channel.IReadChannel.prototype.size     = function() {};
com.ttProject.channel.IReadChannel.prototype.position = function(position) {};
com.ttProject.channel.IReadChannel.prototype.read     = function(uint8Array, callback) {};
com.ttProject.channel.IReadChannel.prototype.close    = function() {};
