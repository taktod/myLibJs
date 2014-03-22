goog.provide("com.ttProject.frame.h264.H264FrameSelector");

goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.frame.h264.type.AccessUnitDelimiter");
goog.require("com.ttProject.frame.h264.type.PictureParameterSet");
goog.require("com.ttProject.frame.h264.type.SequenceParameterSet");
goog.require("com.ttProject.frame.h264.type.SupplementalEnhancementInformation");
goog.require("com.ttProject.frame.h264.type.SliceIDR");
goog.require("com.ttProject.frame.h264.type.Slice");
goog.require("com.ttProject.frame.h264.Type");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit5");

/**
 * @constructor
 */
com.ttProject.frame.h264.H264FrameSelector = function() {
	this._sps = null;
	this._pps = null;
};

com.ttProject.frame.h264.H264FrameSelector.prototype.select = function(channel, callback) {
	if(channel.size() != 0 && channel.size() == channel.position()) {
		console.log("データがなくなった。");
		callback(null);
		return;
	}
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	var forbiddenZeroBit = new com.ttProject.bit.Bit1();
	var nalRefIdc = new com.ttProject.bit.Bit2();
	var type = new com.ttProject.bit.Bit5();
	loader.load(forbiddenZeroBit, nalRefIdc, type, function() {
		var frame = null;
		switch(type.get()) {
		case com.ttProject.frame.h264.Type.Unspecified1:
			break;
		case com.ttProject.frame.h264.Type.Slice:
			frame = new com.ttProject.frame.h264.type.Slice(forbiddenZeroBit, nalRefIdc, type);
			break;
		case com.ttProject.frame.h264.Type.SliceDataPartitionA:
			break;
		case com.ttProject.frame.h264.Type.SliceDataPartitionB:
			break;
		case com.ttProject.frame.h264.Type.SliceDataPartitionC:
			break;
		case com.ttProject.frame.h264.Type.SliceIDR:
			// ここつくる必要あり。
			frame = new com.ttProject.frame.h264.type.SliceIDR(forbiddenZeroBit, nalRefIdc, type);
			break;
		case com.ttProject.frame.h264.Type.SupplementalEnhancementInformation:
			frame = new com.ttProject.frame.h264.type.SupplementalEnhancementInformation(forbiddenZeroBit, nalRefIdc, type);
			break;
		case com.ttProject.frame.h264.Type.SequenceParameterSet:
			frame = new com.ttProject.frame.h264.type.SequenceParameterSet(forbiddenZeroBit, nalRefIdc, type);
			_this._sps = frame;
			break;
		case com.ttProject.frame.h264.Type.PictureParameterSet:
			frame = new com.ttProject.frame.h264.type.PictureParameterSet(forbiddenZeroBit, nalRefIdc, type);
			_this._pps = frame;
			break;
		case com.ttProject.frame.h264.Type.AccessUnitDelimiter:
			frame = new com.ttProject.frame.h264.type.AccessUnitDelimiter(forbiddenZeroBit, nalRefIdc, type);
			break;
		case com.ttProject.frame.h264.Type.EndOfSequence:
			break;
		case com.ttProject.frame.h264.Type.EndOfStream:
			break;
		case com.ttProject.frame.h264.Type.FilterData:
			break;
		case com.ttProject.frame.h264.Type.SequenceParameterSetExtension:
			break;
		case com.ttProject.frame.h264.Type.PrefixNalUnit:
			break;
		case com.ttProject.frame.h264.Type.SubsetSequenceParameterSet:
			break;
		case com.ttProject.frame.h264.Type.Reserved1:
			break;
		case com.ttProject.frame.h264.Type.Reserved2:
			break;
		case com.ttProject.frame.h264.Type.Reserved3:
			break;
		case com.ttProject.frame.h264.Type.CodedSliceAuxiliary:
			break;
		case com.ttProject.frame.h264.Type.CodedSliceExtension:
			break;
		case com.ttProject.frame.h264.Type.CodedSliceForDepthView:
			break;
		case com.ttProject.frame.h264.Type.Reserved4:
			break;
		case com.ttProject.frame.h264.Type.Reserved5:
			break;
		case com.ttProject.frame.h264.Type.Unspecified2:
			break;
		case com.ttProject.frame.h264.Type.Unspecified3:
			break;
		case com.ttProject.frame.h264.Type.Unspecified4:
			break;
		case com.ttProject.frame.h264.Type.Unspecified5:
			break;
		case com.ttProject.frame.h264.Type.Unspecified6:
			break;
		case com.ttProject.frame.h264.Type.Unspecified7:
			break;
		case com.ttProject.frame.h264.Type.Unspecified8:
			break;
		case com.ttProject.frame.h264.Type.Unspecified9:
			break;
		default:
			throw new Error("想定外のframeでした。:" + type.get());
		};
		if(frame == null) {
			throw new Error("frameの実体が作成されていませんでした。:" + type.get());
		}
		if(!(frame instanceof com.ttProject.frame.h264.type.SequenceParameterSet)) {
			frame.setSps(_this._sps);
			if(!(frame instanceof com.ttProject.frame.h264.type.PictureParameterSet)) {
				frame.setPps(_this._pps);
			}
		}
		frame.minimumLoad(channel, function() {
			callback(frame);
		});
	});
};
