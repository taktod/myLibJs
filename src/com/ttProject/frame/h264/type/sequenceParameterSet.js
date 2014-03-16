goog.provide("com.ttProject.frame.h264.type.SequenceParameterSet");

goog.require("com.ttProject.frame.h264.H264Frame");
goog.require("com.ttProject.bit.Ueg");
goog.require("com.ttProject.bit.Seg");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit8");

/**
 * @constructor
 */
com.ttProject.frame.h264.type.SequenceParameterSet = function(forbiddenZeroBit, nalRefIdc, type) {
	goog.base(this, forbiddenZeroBit, nalRefIdc, type);
	// 先頭の３バイトからこのデータが取得可能
	this._profileIdc         = new com.ttProject.bit.Bit8();
	this._constraintSet0Flag = new com.ttProject.bit.Bit1();
	this._constraintSet1Flag = new com.ttProject.bit.Bit1();
	this._constraintSet2Flag = new com.ttProject.bit.Bit1();
	this._constraintSet3Flag = new com.ttProject.bit.Bit1();
	this._constraintSet4Flag = new com.ttProject.bit.Bit1();
	this._constraintSet5Flag = new com.ttProject.bit.Bit1();
	this._reservedZeroBits   = new com.ttProject.bit.Bit2();
	this._levelIdc           = new com.ttProject.bit.Bit8();
	
	this._seqParameterSetId               = new com.ttProject.bit.Ueg();
	this._chromaFormatIdc                 = null; // ueg
	this._separateColourPlaneFlag         = null; // bit1
	this._bitDepthLumaMinus8              = null; // ueg
	this._bitDepthChromaMinus8            = null; // ueg
	this._qpprimeYZeroTransformBypassFlag = null; // bit1
	this._seqScalingMatrixPresentFlag     = null; // bit1
	this._seqScalingListPresentFlag       = null; // bit1[]
	
	this._log2MaxFrameNumMinus4          = new com.ttProject.bit.Ueg();
	this._picOrderCntType                = new com.ttProject.bit.Ueg();
	this._log2MaxPicOrderCntLsbMinus4    = null; // ueg
	this._deltaPicOrderAlwaysZeroFlag    = null; // bit1
	this._offsetForNonRefPic             = null; // seg
	this._offsetForTopToBottomField      = null; // seg
	this._numRefFramesInPicOrderCntCycle = null; // ueg
	this._offsetForRefFrame              = null; // seg[]

	this._maxNumRefFrames                = new com.ttProject.bit.Ueg();
	this._gapsInFrameNumValueAllowedFlag = new com.ttProject.bit.Bit1();
	this._picWidthInMbsMinus1            = new com.ttProject.bit.Ueg();
	this._picHeightInMapUnitsMinus1      = new com.ttProject.bit.Ueg();
	this._frameMbsOnlyFlag               = new com.ttProject.bit.Bit1();
	this._mbAdaptiveFrameFieldFlag       = null; // bit1
	this._direct8x8InferenceFlag         = new com.ttProject.bit.Bit1();
	this._frameCroppingFlag              = new com.ttProject.bit.Bit1();
	this._frameCropLeftOffset            = null; // ueg
	this._frameCropRightOffset           = null; // ueg
	this._frameCropTopOffset             = null; // ueg
	this._frameCropBottomOffset          = null; // ueg
	this._vuiParametersPresentFlag       = new com.ttProject.bit.Bit1();

	this._extraBit = null; // 超過bit
	
	this._buffer = null;
};

goog.inherits(com.ttProject.frame.h264.type.SequenceParameterSet, com.ttProject.frame.h264.H264Frame);

com.ttProject.frame.h264.type.SequenceParameterSet.prototype.minimumLoad = function(channel, callback){
	var _this = this;
	var loader = new com.ttProject.bit.BitLoader(channel);
	var eleventh = function() {
		_this.setSize(channel.size());
		
		var width = (_this._picWidthInMbsMinus1.get() + 1) * 16;
		var height = ((2 - _this._frameMbsOnlyFlag.get()) * (_this._picHeightInMapUnitsMinus1.get() + 1) * 16);
		if(_this._frameCroppingFlag.get() == 1) {
			width = width - _this._frameCropLeftOffset.get() * 2 - _this._frameCropRightOffset.get() * 2;
			height = height - _this._frameCropTopOffset.get() * 2 - _this._frameCropBottomOffset.get() * 2;
		}
		_this.setWidth(width);
		_this.setHeight(height);
		callback();
	};
	var tenth = function() {
		if(_this._vuiParametersPresentFlag.get() == 1) {
			// parameterを読み込む
			// とりあえずいまは必要ないので、放置しておく。
		}
		loader.getExtraBit(function(data) {
			_this._extraBit = data;
			eleventh();
		});
	};
	var ninth = function() {
		loader.load(_this._vuiParametersPresentFlag, tenth);
	};
	var eighth = function() {
		if(_this._frameCroppingFlag.get() == 1) {
			_this._frameCropLeftOffset = new com.ttProject.bit.Ueg();
			_this._frameCropRightOffset = new com.ttProject.bit.Ueg();
			_this._frameCropTopOffset = new com.ttProject.bit.Ueg();
			_this._frameCropBottomOffset = new com.ttProject.bit.Ueg();
			loader.load(_this._frameCropLeftOffset,
					_this._frameCropRightOffset,
					_this._frameCropTopOffset,
					_this._frameCropBottomOffset,
					ninth);
		}
		else {
			ninth();
		}
	};
	var seventh = function() {
		loader.load(_this._direct8x8InferenceFlag,
				_this._frameCroppingFlag,
				eighth);
	};
	var sixth = function() {
		if(_this._frameMbsOnlyFlag.get() == 0) {
			_this._mbAdaptiveFrameFieldFlag = new com.ttProject.bit.Bit1();
			loader.load(_this._mbAdaptiveFrameFieldFlag, seventh);
		}
		else {
			seventh();
		}
	};
	var fifth = function() {
		loader.load(_this._maxNumRefFrames,
				_this._gapsInFrameNumValueAllowedFlag,
				_this._picWidthInMbsMinus1,
				_this._picHeightInMapUnitsMinus1,
				_this._frameMbsOnlyFlag,
				sixth);
	};
	var fourth = function() {
		if(_this._picOrderCntType.get() == 0) {
			_this._log2MaxPicOrderCntLsbMinus4 = new com.ttProject.bit.Ueg();
			loader.load(_this._log2MaxPicOrderCntLsbMinus4, fifth);
		}
		else {
			var fourthSecond = function() {
				var cnt = _this._numRefFramesInPicOrderCntCycle.get();
				if(cnt == 0) {
					fifth();
				}
				else {
					_this._offsetForRefFrame = [];
					for(var i = 0;i < cnt;i ++) {
						_this._offsetForRefFrame[i] = new com.ttProject.bit.Seg();
					}
					loader.load(_this._offsetForRefFrame, fifth);
				}
			};
			var fourthFirst = function() {
				_this._deltaPicOrderAlwaysZeroFlag = new com.ttProject.bit.Bit1();
				_this._offsetForNonRefPic = new com.ttProject.bit.Seg();
				_this._offsetForTopToBottomField = new com.ttProject.bit.Seg();
				_this._numRefFramesInPicOrderCntCycle = new com.ttProject.bit.Ueg();
				loader.load(_this._deltaPicOrderAlwaysZeroFlag,
						_this._offsetForNonRefPic,
						_this._offsetForTopToBottomField,
						_this._numRefFramesInPicOrderCntCycle,
						fourthSecond);
			};
			fourthFirst();
		}
	};
	var third = function() {
		loader.load(_this._log2MaxFrameNumMinus4, _this._picOrderCntType, fourth);
	};
	var second = function() {
		var profile = _this._profileIdc.get();
		switch(profile) {
		case 44:
		case 83:
		case 86:
		case 100:
		case 110:
		case 118:
		case 122:
		case 128:
		case 138:
		case 244:
			var secondFourth = function() {
				if(_this._seqScalingMatrixPresentFlag.get() == 1) {
					throw new Error("seqScalingMatrixの解析動作は未実装です。");
				}
				third();
			};
			var secondThird = function() {
				_this._bitDepthLumaMinus8 = new com.ttProject.bit.Ueg();
				_this._bitDepthChromaMinus8 = new com.ttProject.bit.Ueg();
				_this._qpprimeYZeroTransformBypassFlag = new com.ttProject.bit.Bit1();
				_this._seqScalingMatrixPresentFlag = new com.ttProject.bit.Bit1();
				loader.load(_this._bitDepthLumaMinus8, _this._bitDepthChromaMinus8,
						_this._qpprimeYZeroTransformBypassFlag, _this._seqScalingMatrixPresentFlag,
						secondFourth);
			};
			var secondSecond = function() {
				if(_this._chromaFormatIdc.get() == 3) {
					_this._separateColourPlaneFlag = new com.ttProject.bit.Bit1();
					loader.load(_this._separateColourPlaneFlag, secondThird);
				}
				else {
					secondThird();
				}
			};
			var secondFirst = function() {
				// chromaFormatIdcを読み込む
				_this._chromaFormatIdc = new com.ttProject.bit.Ueg();
				loader.load(_this._chromaFormatIdc, secondSecond);
			};
			secondFirst();
			break;
		default:
			third();
			break;
		}
	};
	var first = function() {
		loader.load(_this._profileIdc,
				_this._constraintSet0Flag,
				_this._constraintSet1Flag,
				_this._constraintSet2Flag,
				_this._constraintSet3Flag,
				_this._constraintSet4Flag,
				_this._constraintSet5Flag,
				_this._reservedZeroBits,
				_this._levelIdc,
				_this._seqParameterSetId,
				second);
	};
	first();
};

com.ttProject.frame.h264.type.SequenceParameterSet.prototype.load = function(channel, callback) {
	// 読み込むべき位置を決定しておかないと、読み込むサイズが決定しない。
//	channel.read();
};
