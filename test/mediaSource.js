goog.provide("onload");

goog.require("com.ttProject.ms.Manager");

var onload = function() {
	// videoTagのデータを取り出す。
	manager = new com.ttProject.ms.Manager("../mario.flv");
	var video = document.querySelector("video");
	video.src = manager.getUrl();
	video.play();
};

onload();