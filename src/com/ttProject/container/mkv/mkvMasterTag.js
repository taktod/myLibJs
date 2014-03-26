goog.provide("com.ttProject.container.mkv.MkvMasterTag");

goog.require("com.ttProject.container.mkv.MkvTag");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvMasterTag = function(id, size) {
	goog.base(this, id, size);
	this._tags = []; // 内包しているタグリスト保持
};

goog.inherits(com.ttProject.container.mkv.MkvMasterTag, com.ttProject.container.mkv.MkvTag);

com.ttProject.container.mkv.MkvMasterTag.prototype.load = function(channel, callback) {
	var size = this.getMkvSize();
	var _this = this;
	var readTags = function() {
		_this.getMkvTagReader().read(channel, function(mkvTag) {
			size -= mkvTag.getSize();
			_this._tags.push(mkvTag);
			if(size <= 0) {
				callback();
			}
			else {
				readTags();
			}
		});
	};
	readTags();
};
