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
	
};

