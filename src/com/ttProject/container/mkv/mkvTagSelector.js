goog.provide("com.ttProject.container.mkv.MkvTagSelector");

goog.require("com.ttProject.bit.EbmlValue");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.container.mkv.Type");
goog.require("com.ttProject.container.mkv.type.EBML");
goog.require("com.ttProject.container.mkv.type.Segment");
goog.require("com.ttProject.container.mkv.type.SeekHead");

/**
 * @constructor
 */
com.ttProject.container.mkv.MkvTagSelector = function() {
	
};

com.ttProject.container.mkv.MkvTagSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	// EbmlValueで、tagを取り出します。
	var id = new com.ttProject.bit.EbmlValue();
	var size = new com.ttProject.bit.EbmlValue();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(id, size, function() {
		var mkvTag = null;
		switch(id.getEbmlValue()) {
		case com.ttProject.container.mkv.Type.EBML:
			mkvTag = new com.ttProject.container.mkv.type.EBML(id, size);
			break;
		case com.ttProject.container.mkv.Type.Segment:
			mkvTag = new com.ttProject.container.mkv.type.Segment(id, size);
			break;
		case com.ttProject.container.mkv.Type.SeekHead:
			mkvTag = new com.ttProject.container.mkv.type.SeekHead(id, size);
			break;
		default:
			throw new Error("解析されていないタグを発見しました。:" + id.getEbmlValue().toString(16));
		}
		mkvTag.minimumLoad(channel, function() {
			callback(mkvTag);
		});
	});
};
