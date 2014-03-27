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
goog.require("com.ttProject.container.mkv.type.SegmentUID");
goog.require("com.ttProject.container.mkv.type.Duration");
goog.require("com.ttProject.container.mkv.type.Tracks");
goog.require("com.ttProject.container.mkv.type.TrackEntry");
goog.require("com.ttProject.container.mkv.type.TrackNumber");
goog.require("com.ttProject.container.mkv.type.TrackUID");
goog.require("com.ttProject.container.mkv.type.FlagLacing");
goog.require("com.ttProject.container.mkv.type.Language");
goog.require("com.ttProject.container.mkv.type.CodecID");
goog.require("com.ttProject.container.mkv.type.TrackType");
goog.require("com.ttProject.container.mkv.type.DefaultDuration");
goog.require("com.ttProject.container.mkv.type.Video");
goog.require("com.ttProject.container.mkv.type.PixelWidth");
goog.require("com.ttProject.container.mkv.type.PixelHeight");
goog.require("com.ttProject.container.mkv.type.DisplayWidth");
goog.require("com.ttProject.container.mkv.type.DisplayHeight");
goog.require("com.ttProject.container.mkv.type.DisplayUnit");
goog.require("com.ttProject.container.mkv.type.Audio");
goog.require("com.ttProject.container.mkv.type.Channels");
goog.require("com.ttProject.container.mkv.type.SamplingFrequency");
goog.require("com.ttProject.container.mkv.type.BitDepth");
goog.require("com.ttProject.container.mkv.type.Tags");
goog.require("com.ttProject.container.mkv.type.Tag");
goog.require("com.ttProject.container.mkv.type.Targets");
goog.require("com.ttProject.container.mkv.type.SimpleTag");
goog.require("com.ttProject.container.mkv.type.TagName");
goog.require("com.ttProject.container.mkv.type.TagString");
goog.require("com.ttProject.container.mkv.type.Cluster");
goog.require("com.ttProject.container.mkv.type.Timecode");
goog.require("com.ttProject.container.mkv.type.SimpleBlock");

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
		case com.ttProject.container.mkv.Type.SegmentUID:
			mkvTag = new com.ttProject.container.mkv.type.SegmentUID(id, size);
			break;
		case com.ttProject.container.mkv.Type.Duration:
			mkvTag = new com.ttProject.container.mkv.type.Duration(id, size);
			break;
		case com.ttProject.container.mkv.Type.Tracks:
			mkvTag = new com.ttProject.container.mkv.type.Tracks(id, size);
			break;
		case com.ttProject.container.mkv.Type.TrackEntry:
			mkvTag = new com.ttProject.container.mkv.type.TrackEntry(id, size);
			break;
		case com.ttProject.container.mkv.Type.TrackNumber:
			mkvTag = new com.ttProject.container.mkv.type.TrackNumber(id, size);
			break;
		case com.ttProject.container.mkv.Type.TrackUID:
			mkvTag = new com.ttProject.container.mkv.type.TrackUID(id, size);
			break;
		case com.ttProject.container.mkv.Type.FlagLacing:
			mkvTag = new com.ttProject.container.mkv.type.FlagLacing(id, size);
			break;
		case com.ttProject.container.mkv.Type.Language:
			mkvTag = new com.ttProject.container.mkv.type.Language(id, size);
			break;
		case com.ttProject.container.mkv.Type.CodecID:
			mkvTag = new com.ttProject.container.mkv.type.CodecID(id, size);
			break;
		case com.ttProject.container.mkv.Type.TrackType:
			mkvTag = new com.ttProject.container.mkv.type.TrackType(id, size);
			break;
		case com.ttProject.container.mkv.Type.DefaultDuration:
			mkvTag = new com.ttProject.container.mkv.type.DefaultDuration(id, size);
			break;
		case com.ttProject.container.mkv.Type.Video:
			mkvTag = new com.ttProject.container.mkv.type.Video(id, size);
			break;
		case com.ttProject.container.mkv.Type.PixelWidth:
			mkvTag = new com.ttProject.container.mkv.type.PixelWidth(id, size);
			break;
		case com.ttProject.container.mkv.Type.PixelHeight:
			mkvTag = new com.ttProject.container.mkv.type.PixelHeight(id, size);
			break;
		case com.ttProject.container.mkv.Type.DisplayWidth:
			mkvTag = new com.ttProject.container.mkv.type.DisplayWidth(id, size);
			break;
		case com.ttProject.container.mkv.Type.DisplayHeight:
			mkvTag = new com.ttProject.container.mkv.type.DisplayHeight(id, size);
			break;
		case com.ttProject.container.mkv.Type.DisplayUnit:
			mkvTag = new com.ttProject.container.mkv.type.DisplayUnit(id, size);
			break;
		case com.ttProject.container.mkv.Type.Audio:
			mkvTag = new com.ttProject.container.mkv.type.Audio(id, size);
			break;
		case com.ttProject.container.mkv.Type.Channels:
			mkvTag = new com.ttProject.container.mkv.type.Channels(id, size);
			break;
		case com.ttProject.container.mkv.Type.SamplingFrequency:
			mkvTag = new com.ttProject.container.mkv.type.SamplingFrequency(id, size);
			break;
		case com.ttProject.container.mkv.Type.BitDepth:
			mkvTag = new com.ttProject.container.mkv.type.BitDepth(id, size);
			break;
		case com.ttProject.container.mkv.Type.Tags:
			mkvTag = new com.ttProject.container.mkv.type.Tags(id, size);
			break;
		case com.ttProject.container.mkv.Type.Tag:
			mkvTag = new com.ttProject.container.mkv.type.Tag(id, size);
			break;
		case com.ttProject.container.mkv.Type.Targets:
			mkvTag = new com.ttProject.container.mkv.type.Targets(id, size);
			break;
		case com.ttProject.container.mkv.Type.SimpleTag:
			mkvTag = new com.ttProject.container.mkv.type.SimpleTag(id, size);
			break;
		case com.ttProject.container.mkv.Type.TagName:
			mkvTag = new com.ttProject.container.mkv.type.TagName(id, size);
			break;
		case com.ttProject.container.mkv.Type.TagString:
			mkvTag = new com.ttProject.container.mkv.type.TagString(id, size);
			break;
		case com.ttProject.container.mkv.Type.Cluster:
			mkvTag = new com.ttProject.container.mkv.type.Cluster(id, size);
			break;
		case com.ttProject.container.mkv.Type.Timecode:
			mkvTag = new com.ttProject.container.mkv.type.Timecode(id, size);
			break;
		case com.ttProject.container.mkv.Type.SimpleBlock:
			mkvTag = new com.ttProject.container.mkv.type.SimpleBlock(id, size);
			break;
		default:
			throw new Error("解析されていないタグを発見しました。:" + id.getEbmlValue().toString(16));
		}
		mkvTag.minimumLoad(channel, function() {
			callback(mkvTag);
		});
	});
};
