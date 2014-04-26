goog.provide("com.ttProject.Test");

goog.require("com.ttProject.util.StackUtil");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.channel.ReadChannel");
goog.require("com.ttProject.bit.BitLoader");
goog.require("com.ttProject.bit.BitConnector");
goog.require("com.ttProject.bit.Bit1");
goog.require("com.ttProject.bit.Bit2");
goog.require("com.ttProject.bit.Bit3");
goog.require("com.ttProject.bit.Bit4");
goog.require("com.ttProject.bit.Bit5");
goog.require("com.ttProject.bit.Bit6");
goog.require("com.ttProject.bit.Bit7");
goog.require("com.ttProject.bit.Bit8");
goog.require("com.ttProject.bit.EbmlValue");

/**
 * stackUtilの動作について確認
 */
function testStack() {
	var func = function() {
		com.ttProject.util.StackUtil.call(function() {
			console.log("stack1");
			com.ttProject.util.StackUtil.call(function() { // stackが先に呼ばれた部分で実行されるので、stack3が先に呼ばれる
				console.log("stack2");
			});
			console.log("stack3");
		});
	};
	func();
}

/**
 * hexUtilの動作について確認
 */
function testHexUtil() {
	var arg = com.ttProject.util.HexUtil.makeBuffer("0102030405");
	console.log(com.ttProject.util.HexUtil.toHex(arg, true));
};

/**
 * bitやりとり動作をテストする
 */
function testBit() {
	var b1 = new com.ttProject.bit.Bit1(1);
	var b2 = new com.ttProject.bit.Bit2(2);
	var b3 = new com.ttProject.bit.Bit3(3);
	var b4 = new com.ttProject.bit.Bit2(3);
	var b5 = new com.ttProject.bit.Bit4(1);
	var b6 = new com.ttProject.bit.Bit4(1);
	var connector = new com.ttProject.bit.BitConnector();
	var result = connector.connect(b1,b2,b3,b4,b5,b6);
	var val = com.ttProject.util.HexUtil.toHex(result, true);
	console.log(val);
	if(val != "CF 11 ") {
		throw new Error("bit動作出力が意図しない値になりました。");
	}
}

function testLoadFile() {
	var channel = new com.ttProject.channel.ReadChannel("test.dat");
	channel.read(4, function(data) {
		console.log(com.ttProject.util.HexUtil.toHex(data, true));
	});
}