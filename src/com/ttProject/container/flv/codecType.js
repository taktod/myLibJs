goog.provide("com.ttProject.container.flv.AudioCodecType");

/**
 * flvのaudioCodec設定定義
 * @enum {number}
 */
com.ttProject.container.flv.AudioCodecType = {
	PCM: 0,
	ADPCM: 1,
	MP3: 2,
	LPCM: 3,
	NELLY_16: 4,
	NELLY_8: 5,
	NELLY: 6,
	G711_A: 7,
	G711_U: 8,
	RESERVED: 9,
	AAC: 10,
	SPEEX: 11,
	MP3_8: 14,
	DEVICE_SPECIFIC: 15
};

/**
 * flvのvideoCodec設定定義
 * @enum {number}
 */
com.ttProject.container.flv.VideoCodecType = {
	JPEG: 1,
	FLV1: 2,
	SCREEN: 3,
	ON2VP6: 4,
	ON2VP6_ALPHA: 5,
	SCREEN_V2: 6,
	H264: 7
};
