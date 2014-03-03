goog.provide("com.ttProject.util.ArrayUtil");

/**
 * arrayデータを適切なuintに変更します。
 * 数値の配列→uint32扱いとします。
 * @param path
 */
(function(path) {
	/**
	 * @constructor
	 */
	path.ArrayUtil = function() {
	};
	path.ArrayUtil.toUint8 = function(array) {
		if(array instanceof Uint8Array
		|| array instanceof Uint16Array
		|| array instanceof Uint32Array) {
			return new Uint8Array(array.buffer);
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
	path.ArrayUtil.toUint16 = function(array) {
		if(array instanceof Uint8Array
		|| array instanceof Uint16Array
		|| array instanceof Uint32Array) {
			return new Uint16Array(array.buffer);
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
	path.ArrayUtil.toUint32 = function(array) {
		if(array instanceof Uint8Array
		|| array instanceof Uint16Array
		|| array instanceof Uint32Array) {
			return new Uint32Array(array.buffer);
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
})(com.ttProject.util);
