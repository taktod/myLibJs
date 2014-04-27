goog.provide("com.ttProject.test.Container");

goog.require("com.ttProject.channel.ReadChannel");
goog.require("com.ttProject.container.flv.FlvTagReader");
goog.require("com.ttProject.container.adts.AdtsUnitReader");
goog.require("com.ttProject.container.mp3.Mp3UnitReader");

/**
 * container系の動作のテスト
 */

/**
 * flvのデータ読み込み動作テスト
 */
var testFlvLoad = function() {
	var channel = new com.ttProject.channel.ReadChannel("resource/test.h264aac.flv");
	var reader = new com.ttProject.container.flv.FlvTagReader();
	var readLoop = function() {
		reader.read(channel, function(unit) {
			if(unit == null) {
				return;
			}
			console.log(unit.toString());
			readLoop(); // 次のオブジェクトを読み込みにいく。
		});
	};
	readLoop();
};

/**
 * aacのデータ読み込み動作テスト
 */
var testAacLoad = function() {
	var channel = new com.ttProject.channel.ReadChannel("resource/test.aac");
	var reader = new com.ttProject.container.adts.AdtsUnitReader();
	var readLoop = function() {
		reader.read(channel, function(unit) {
			if(unit == null) {
				return;
			}
			console.log(unit.toString());
			readLoop();
		});
	};
	readLoop();
};

/**
 * mp3のデータ読み込み動作テスト
 */
var testMp3Load = function() {
	var channel = new com.ttProject.channel.ReadChannel("resource/test.mp3");
	var reader = new com.ttProject.container.mp3.Mp3UnitReader();
	var readLoop = function() {
		reader.read(channel, function(unit) {
			if(unit == null) {
				return;
			}
			console.log(unit.toString());
			readLoop();
		});
	};
	readLoop();
};
