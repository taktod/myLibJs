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
		if(array instanceof Uint8Array) {
			return array;
		}
		else if(array instanceof Uint16Array) {
			return new Uint8Array(array.buffer);
		}
		else if(array instanceof Uint32Array) {
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
		
	};
	path.ArrayUtil.toUint32 = function(array) {
		
	};
})(com.ttProject.util);
