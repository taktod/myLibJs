goog.provide("com.ttProject.frame.h264.Type");

/**
 * h264のtypeデータ定義
 * @enum {number}
 */
com.ttProject.frame.h264.Type = {
	Unspecified1:                      0x00,
	Slice:                             0x01, // NON IDR
	SliceDataPartitionA:               0x02,
	SliceDataPartitionB:               0x03,
	SliceDataPartitionC:               0x04,
	SliceIDR:                          0x05,
	SupplementalEnhancementInformation:0x06,
	SequenceParameterSet:              0x07,
	PictureParameterSet:               0x08,
	AccessUnitDelimiter:               0x09,
	EndOfSequence:                     0x0A,
	EndOfStream:                       0x0B,
	FilterData:                        0x0C,
	SequenceParameterSetExtension:     0x0D,
	PrefixNalUnit:                     0x0E,
	SubsetSequenceParameterSet:        0x0F,
	Reserved1:                         0x10,
	Reserved2:                         0x11,
	Reserved3:                         0x12,
	CodedSliceAuxiliary:               0x13,
	CodedSliceExtension:               0x14,
	CodedSliceForDepthView:            0x15,
	Reserved4:                         0x16,
	Reserved5:                         0x17,
	Unspecified2:                      0x18,
	Unspecified3:                      0x19,
	Unspecified4:                      0x1A,
	Unspecified5:                      0x1B,
	Unspecified6:                      0x1C,
	Unspecified7:                      0x1D,
	Unspecified8:                      0x1E,
	Unspecified9:                      0x1F
};
