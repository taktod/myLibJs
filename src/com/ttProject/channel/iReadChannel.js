goog.provide("com.ttProject.channel.IReadChannel");

/**
 * データを連続で読み込む動作のインターフェイス
 * なんでこんなのがいるんだろうって思われるかもしれないね・・・
 * とりあえず、bitLoaderで読み込んだら、読み込んだ分だけポインタが移動するみたいなbinaryの読み込みがほしい。
 */
(function(path) {
	/**
	 * @interface
	 */
	path.IReadChannel = function() {};
	path.IReadChannel.prototype.isOpen   = function() {};
	path.IReadChannel.prototype.size     = function() {};
	path.IReadChannel.prototype.position = function(position) {};
	path.IReadChannel.prototype.read     = function(uint8Array, callback) {};
	path.IReadChannel.prototype.close    = function() {};
})(com.ttProject.channel);
