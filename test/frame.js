goog.provide("com.ttProject.test.Frame");

goog.require("com.ttProject.channel.Uint8ReadChannel");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.frame.h264.ConfigData");
goog.require("com.ttProject.frame.aac.DecoderSpecificInfo");

/**
 * frame系の動作のテスト
 */
/**
 * h264のconfigDataの読み込みテスト
 */
function testH264ConfigRead() {
	var channel = new com.ttProject.channel.Uint8ReadChannel(com.ttProject.util.HexUtil.makeBuffer("014D401EFFE10019674D401E924201405FF2E02200000300C800002ED51E2C5C9001000468EE32C8"));
	var configData = new com.ttProject.frame.h264.ConfigData();
	configData.getNalsFrame(channel, function() {
		// とりあえずspsからwidth heightの値を確認しておく。
		var sps = configData.getSps();
		console.log(configData.getSps().getWidth());
		console.log(configData.getSps().getHeight());
		if(sps.getWidth() != 640 || sps.getHeight() != 360) {
			throw new Error("configDataの解析結果がおかしいみたいです。");
		}
	});
};

/**
 * aacのdecoderSpecificInfoの読み込みテスト
 */
function testAacDsiRead() {
	var channel = new com.ttProject.channel.Uint8ReadChannel(com.ttProject.util.HexUtil.makeBuffer("1210"));
	var dsi = new com.ttProject.frame.aac.DecoderSpecificInfo();
	dsi.minimumLoad(channel, function(output) {
		console.log(dsi.getObjectType());
		console.log(dsi.getFrequencyIndex());
		console.log(dsi.getChannelConfiguration());
	});
}