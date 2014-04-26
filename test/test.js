goog.provide("com.ttProject.Test");

goog.require("com.ttProject.util.StackUtil");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.channel.JavaFileReadChannel");

function testHoge() {
	console.log("testHoge開始");
	com.ttProject.util.StackUtil.call(function() {
		var arg = com.ttProject.util.HexUtil.makeBuffer("0102030405");
		console.log(com.ttProject.util.HexUtil.toHex(arg, true));
		console.log("stack実行");
	});
};

function testAiueo() {
	console.log("testAiueo開始");
	var channel = new com.ttProject.channel.JavaFileReadChannel("http://49.212.39.17/mario.flv");
	channel.read(4, function(buf) {
		console.log(com.ttProject.util.HexUtil.toHex(buf, true));
	});
}