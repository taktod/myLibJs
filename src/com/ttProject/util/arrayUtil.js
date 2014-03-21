goog.provide("com.ttProject.util.ArrayUtil");

/**
 * @constructor
 */
com.ttProject.util.ArrayUtil = function() {
};
com.ttProject.util.ArrayUtil.toUint8 = function(array) {
	if(array instanceof Uint8Array
	|| array instanceof Uint16Array
	|| array instanceof Uint32Array) {
		// これを実施すると元のarrayにもどされるっぽい。
		// Uint8Arrayとかは一部分だけ保持しているみたいですね。
		return new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
	}
	else if(!isNaN(array)){
		// 数値だったら
		var ary = [];
		do {
			ary.unshift(array & 0xFF);
			array >>>= 8;
		} while(array > 0);
		return new Uint8Array(ary);
	}
	else {
		return new Uint8Array(array);
	}
};
com.ttProject.util.ArrayUtil.toUint16 = function(array) {
	if(array instanceof Uint8Array
	|| array instanceof Uint16Array
	|| array instanceof Uint32Array) {
		return new Uint16Array(array.buffer, array.byteOffset, array.byteLength);
	}
	else if(!isNaN(array)){
		// 数値だったら
		var ary = [];
		do {
			ary.unshift(array & 0xFFFF);
			array >>>= 16;
		} while(array > 0);
		return new Uint16Array(ary);
	}
	else {
		return new Uint16Array(array);
	}
};
com.ttProject.util.ArrayUtil.toUint32 = function(array) {
	if(array instanceof Uint8Array
	|| array instanceof Uint16Array
	|| array instanceof Uint32Array) {
		return new Uint32Array(array.buffer, array.byteOffset, array.byteLength);
	}
	else if(!isNaN(array)){
		// 数値だったら
		var ary = [];
		do {
			ary.unshift(array & 0xFFFFFFFF);
			array >>>= 32;
		} while(array > 0);
		return new Uint32Array(ary);
	}
	else {
		return new Uint32Array(array);
	}
};
/**
 * 初列を結合します。Uint8Arrayとか用
 */
com.ttProject.util.ArrayUtil.connect = function() {
	// argumentsをみて、結合していきたいところ。
	// memoこの方法でやると、frの読み込み待ちしないとデータが取得できない
	// とりあえず中身は確認せずに結合してしまおう。
/*	var blob = new Blob([new Uint8Array([1,2,3]), new Uint8Array([4,5,6])]);
	var fr = new FileReader();
	fr.readAsArrayBuffer(blob);
	return new Uint8Array(fr.result);*/
	var size = 0;
	for(var key in arguments) {
		var array = arguments[key];
		if(array instanceof Uint8Array
		|| array instanceof Uint16Array
		|| array instanceof Uint32Array) {
			size += array.length;
		}
	}
	var result = new Uint8Array(size);
	var pos = 0;
	for(var key in arguments) {
		var array = arguments[key];
		if(array instanceof Uint8Array
		|| array instanceof Uint16Array
		|| array instanceof Uint32Array) {
			result.set(array, pos);
			pos += array.length;
		}
	}
	return result;
};
