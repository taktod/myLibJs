goog.provide("com.ttProject.util.ArrayUtil");

/**
 * arrayデータを適切なuintに変更します。
 * 数値の配列→uint32扱いとします。
 * @param path
 */
(function(path) {
	/**
	 * @constractor
	 */
	path.ArrayUtil = function() {
	};
	path.ArrayUtil.toUint8 = function(array) {
		if(array instanceof Uint8Array) {
			return array;
		}
		else if(array instanceof Uint16Array) {
			var result = [];
			for(var i = 0;i < array.length;i ++) {
				result.push((array[i] >>> 8) & 0xFF);
				result.push((array[i]) & 0xFF);
			}
			return new Uint8Array(result);
		}
		else if(array instanceof Uint32Array) {
			var result = [];
			for(var i = 0;i < array.length;i ++) {
				result.push((array[i] >>> 24) & 0xFF);
				result.push((array[i] >>> 16) & 0xFF);
				result.push((array[i] >>> 8) & 0xFF);
				result.push((array[i]) & 0xFF);
			}
			return new Uint8Array(result);
		}
		else if(!isNaN(array)){
			// 数値だったら
			var ary = [];
			do {
				ary.unshift(array & 0xFF);
				array >>>= 8;
			}while(array > 0);
			return new Uint8Array(ary);
		}
		else {
			return new Uint8Array(array);
		}
	};
	path.ArrayUtil.toUint16 = function(array) {
		
	};
	path.ArrayUtil.toUint32 = function(array) {
		
	};
	path.ArrayUtil.Uint8ToUint16 = function(array) {
		if(!(array instanceof Uint8Array)) {
			throw new Error("入力がuint8ではありません");
		}
	};
	path.ArrayUtil.Uint8ToUint32 = function(array) {
		if(!(array instanceof Uint8Array)) {
			throw new Error("入力がuint8ではありません");
		}
	};
	path.ArrayUtil.Uint16ToUint8 = function(array) {
		if(!(array instanceof Uint16Array)) {
			throw new Error("入力がuint16ではありません");
		}
	};
	path.ArrayUtil.Uint16ToUint32 = function(array) {
		if(!(array instanceof Uint16Array)) {
			throw new Error("入力がuint16ではありません");
		}
	};
	path.ArrayUtil.Uint32ToUint8 = function(array) {
		if(!(array instanceof Uint32Array)) {
			throw new Error("入力がuint32ではありません");
		}
	};
	path.ArrayUtil.Uint32ToUint16 = function(array) {
		if(!(array instanceof Uint32Array)) {
			throw new Error("入力がuint32ではありません");
		}
	};
})(com.ttProject.util);
