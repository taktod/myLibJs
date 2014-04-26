goog.provide("com.ttProject.Test");

goog.require("com.ttProject.util.StackUtil");
goog.require("com.ttProject.util.HexUtil");
goog.require("com.ttProject.channel.ReadChannel");
goog.require("com.ttProject.channel.Uint8ReadChannel");
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
goog.require("com.ttProject.bit.Ueg");
goog.require("com.ttProject.bit.Seg");
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
};

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
};

/**
 * ebmlValueの読み込み動作テスト
 */
function testLoadEbmlValue() {
	var channel = new com.ttProject.channel.Uint8ReadChannel(com.ttProject.util.HexUtil.makeBuffer("814005"));
	var ebml1 = new com.ttProject.bit.EbmlValue();
	var ebml2 = new com.ttProject.bit.EbmlValue();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(ebml1, ebml2, function() {
		console.log(ebml1.get());
		console.log(ebml2.get());
		if(ebml1.get() != 1 || ebml2.get() != 5) {
			throw new Error("ebmlの値が想定外でした。");
		}
	});
};

/**
 * expGolombの動作テスト
 */
function testLoadGolomb() {
	var channel = new com.ttProject.channel.Uint8ReadChannel(com.ttProject.util.HexUtil.makeBuffer("68"));
	var ueg = new com.ttProject.bit.Ueg();
	var seg = new com.ttProject.bit.Seg();
	var loader = new com.ttProject.bit.BitLoader(channel);
	loader.load(ueg, seg, function() {
		console.log(ueg.get());
		console.log(seg.get());
		if(ueg.get() != 2 || seg.get() != 1) {
			throw new Error("golombのデータの読み込み値がおかしいです。");
		}
	});
};

/**
 * ファイルの読み込み動作テスト
 */
function testLoadFile() {
	var channel = new com.ttProject.channel.ReadChannel("test.dat");
	channel.read(4, function(data) {
		console.log(com.ttProject.util.HexUtil.toHex(data, true));
	});
};
