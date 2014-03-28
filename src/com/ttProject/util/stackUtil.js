goog.provide("com.ttProject.util.StackUtil");

/**
 * callbackでstackを積みすぎると死ぬので、その対策
 * ただし、外部で利用は不可(stackの順番が狂うとこまったことになると思う)
 * 
 * @constructor
 */
com.ttProject.util.StackUtil = function() {
};

/**
 * stackを積む
 */
com.ttProject.util.StackUtil.push = function(callback) {
	if(com.ttProject.util.StackUtil._subStacks == undefined) {
		com.ttProject.util.StackUtil._subStacks = [];
	}
	com.ttProject.util.StackUtil._subStacks.push(callback);
};

/**
 * 詰んだstackを実行する
 */
com.ttProject.util.StackUtil.run = function() {
	// 発動中なら、再発動しない
	if(com.ttProject.util.StackUtil._run == true) {
		return;
	}
	com.ttProject.util.StackUtil._run = true;
	if(com.ttProject.util.StackUtil._subStacks == undefined) {
		com.ttProject.util.StackUtil._subStacks = [];
	}
//	if(com.ttProject.util.StackUtil._stacks == undefined) {
		com.ttProject.util.StackUtil._stacks = com.ttProject.util.StackUtil._subStacks;
		com.ttProject.util.StackUtil._subStacks = [];
//	}
	while(com.ttProject.util.StackUtil._stacks.length > 0) {
//		console.log("処理開始");
		var callback = com.ttProject.util.StackUtil._stacks.shift();
		callback();
		// subStacksの内容をstacksに追記しておく。
		while(com.ttProject.util.StackUtil._subStacks.length > 0) {
			com.ttProject.util.StackUtil._stacks.unshift(com.ttProject.util.StackUtil._subStacks.pop());
		}
//		console.log("callbackおわり");
	}
//	console.log("処理ぬけた");
	com.ttProject.util.StackUtil._run = false; // 発動がおわったので、フラグを折っておく。
};

com.ttProject.util.StackUtil.call = function(callback) {
	com.ttProject.util.StackUtil.push(callback);
	com.ttProject.util.StackUtil.run();
}