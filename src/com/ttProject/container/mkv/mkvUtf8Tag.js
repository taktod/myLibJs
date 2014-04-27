goog.provide("com.ttProject.container.mkv.MkvUtf8Tag");

goog.require("com.ttProject.container.mkv.MkvTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvUtf8Tag = function(id, size) {
	goog.base(this, id, size);
	this._str = null;
};

goog.inherits(com.ttProject.container.mkv.MkvUtf8Tag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvUtf8Tag.prototype.load = function(channel, callback) {
	var _this = this;
	channel.read(this.getMkvSize(), function(data) {
		if(data instanceof Uint8Array) {
			if(data.get) {
				console.log(data.length);
				var ary = [];
				for(var i = 0;i < data.length;i ++) {
					ary.push(data.get(i));
				}
				_this._str = String.fromCharCode.apply(null, ary);
			}
			else {
				_this._str = String.fromCharCode.apply(null, data);
			}
			callback();
			return;
		}
		throw new Error("設定データがおかしい");
	});
};

com.ttProject.container.mkv.MkvUtf8Tag.prototype.getValue = function() {
	return this._str;
};
