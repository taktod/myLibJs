goog.provide("com.ttProject.Test");

goog.require("com.ttProject.util.StackUtil");
goog.require("com.ttProject.util.HexUtil");

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
}