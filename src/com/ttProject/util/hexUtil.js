goog.provide("com.ttProject.util.HexUtil");

goog.require("com.ttProject.util.ArrayUtil");

/**
 * @constractor
 */
com.ttProject.util.HexUtil = function() {
};
com.ttProject.util.HexUtil.toHex = function(data, offset, length, withSeparator) {
	var hexDigits = 
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	var separator = ' ';
	var toHexChars = function(b) {
		var left = hexDigits[(b >>> 4) & 0x0F];
		var right = hexDigits[b & 0x0F];
		return left + right;
	};
	var toHexByte = function(byteArray) {
		var array = com.ttProject.util.ArrayUtil.toUint8(byteArray);
		return toHexByteWithSeparator(array, false);
	};
	var toHexByteWithSeparator = function(byteArray, withSeparator) {
		var array = com.ttProject.util.ArrayUtil.toUint8(byteArray);
		return toHexByteOffsetWithSeparator(array, 0, array.length, withSeparator);
	};
	var toHexByteOffsetWithSeparator = function(byteArray, offset, length, withSeparator) {
		var array = com.ttProject.util.ArrayUtil.toUint8(byteArray);
		// uint16の場合は2byteずつ uint32の場合は4byteずつデータを切り出す必要がありそうだ。
		var result = "";
		for(var i = offset;i < offset + length;) {
			if(array.get) {
				result += toHexChars(array.get(i ++));
			}
			else {
				result += toHexChars(array[i ++]);
			}
			if(withSeparator) {
				result += separator;
			}
		}
		return result;
	};
	if(isNaN(data) && (data == undefined || data.length == undefined)) {
		throw new Error("不正なデータが送られました");
	}
	if(offset == undefined) {
		return toHexByte(data);
	}
	if(typeof offset == "boolean" || offset instanceof Boolean) {
		// 第２引数がtrue falseの場合
		return toHexByteWithSeparator(data, offset);
	}
	return toHexByteOffsetWithSeparator(data, offset, length, withSeparator);
};

com.ttProject.util.HexUtil.makeBuffer = function(hexString) {
	var i = 0;
	var u8Ary = new Uint8Array(hexString.length / 2);
	var dataView = new DataView(u8Ary.buffer);
	var ary = [];
	for(i = 0;i < hexString.length;i += 2) {
		dataView.setUint8(i / 2, parseInt(hexString.substr(i, 2), 16));
//		u8Ary.set(i / 2, parseInt(hexString.substr(i, 2), 16));
//		ary.push(parseInt(hexString.substr(i, 2), 16));
	}
	return u8Ary;
//	return new Uint8Array(ary);
};
