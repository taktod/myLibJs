goog.provide("com.ttProject.frame.h264.SliceType");

/**
 * h264のsliceの内部データ定義
 * @enum {number}
 */
com.ttProject.frame.h264.SliceType = {
	P_Slice:  0,
	B_Slice:  1,
	I_Slice:  2,
	SP_Slice: 3,
	SI_Slice: 4,
	P_Slice2: 5,
	B_Slice2: 6,
	I_Slice2: 7,
	SP_Slice2:8,
	SI_Slice2:9
};
// TODO ヘルプ用の関数定義ができるか調べておきたいところ。
// 内容からすると無理っぽいかな
// またclosure-compilerがどうなるかわからん。