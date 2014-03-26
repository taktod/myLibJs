goog.provide("com.ttProject.container.mkv.MkvTagSelector");

goog.require("com.ttProject.bit.EbmlValue");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.container.mkv.Type");
goog.require("com.ttProject.container.mkv.type.EBML");
goog.require("com.ttProject.container.mkv.type.Segment");
goog.require("com.ttProject.container.mkv.type.SeekHead");
goog.require("com.ttProject.container.mkv.type.Seek");
goog.require("com.ttProject.container.mkv.type.SeekID");
goog.require("com.ttProject.container.mkv.type.SeekPosition");
goog.require("com.ttProject.container.mkv.type.Void");
goog.require("com.ttProject.container.mkv.type.Info");
goog.require("com.ttProject.container.mkv.type.TimecodeScale");
goog.require("com.ttProject.container.mkv.type.MuxingApp");
goog.require("com.ttProject.container.mkv.type.WritingApp");

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
		case com.ttProject.container.mkv.Type.Seek:
			mkvTag = new com.ttProject.container.mkv.type.Seek(id, size);
			break;
		case com.ttProject.container.mkv.Type.SeekID:
			mkvTag = new com.ttProject.container.mkv.type.SeekID(id, size);
			break;
		case com.ttProject.container.mkv.Type.SeekPosition:
			mkvTag = new com.ttProject.container.mkv.type.SeekPosition(id, size);
			break;
		case com.ttProject.container.mkv.Type.Void:
			mkvTag = new com.ttProject.container.mkv.type.Void(id, size);
			break;
		case com.ttProject.container.mkv.Type.Info:
			mkvTag = new com.ttProject.container.mkv.type.Info(id, size);
			break;
		case com.ttProject.container.mkv.Type.TimecodeScale:
			mkvTag = new com.ttProject.container.mkv.type.TimecodeScale(id, size);
			break;
		case com.ttProject.container.mkv.Type.MuxingApp:
			mkvTag = new com.ttProject.container.mkv.type.MuxingApp(id, size);
			break;
		case com.ttProject.container.mkv.Type.WritingApp:
			mkvTag = new com.ttProject.container.mkv.type.WritingApp(id, size);
			break;
		default:
			throw new Error("解析されていないタグを発見しました。:" + id.getEbmlValue().toString(16));
		}
		mkvTag.minimumLoad(channel, function() {
			callback(mkvTag);
		});
	});
};
