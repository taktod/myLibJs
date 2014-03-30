goog.provide("onload");

goog.require('goog.net.XhrIo');

/*
var onload = function() {
	var onAudioProcess = function(e) {
		var outputArray1 = e.outputBuffer.getChannelData(0);
		var outputArray2 = e.outputBuffer.getChannelData(1);
		var n = outputArray1.length;
		console.log(phase);
		for(var i = 0;i < n;i ++) {
			var sample = Math.sin(phase);
			outputArray1[i] = sample * 0.6;
			outputArray2[i] = sample * 0.6;
			
			phase += phaseIncrement;
//			if(phase > kTwoPi) {
//				phase -= kTwoPi;
//			}
		}
	};
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	// contextからデータをつくっていく必要がありそう。
	var phase = 0.0;
	var baseFrequency = 440.0;
	var kSampleRate = 44100;
	var kBufferSize = 1024;
	var phaseIncrement = 2.0 * Math.PI * baseFrequency / kSampleRate;
	var kTwoPi = 2.0 * Math.PI;
	var soundEnabled = false;
	
	var context = new AudioContext();
	jsProcessor = context.createJavaScriptNode(kBufferSize, 0, 2);
	jsProcessor.onaudioprocess = onAudioProcess;
	jsProcessor.connect(context.destination);
	console.log(context);
};
*/

/*
var flag = true;
var onload = function() {
	var onAudioProcess = function(e) {
		// とまったら、それ以降のデータに0を挿入していけばよし。
		var outputArray1 = e.outputBuffer.getChannelData(0);
		var outputArray2 = e.outputBuffer.getChannelData(1);
		var n = outputArray1.length;
		if(flag) {
			for(var i = 0;i < n;i ++) {
				var sample = Math.sin(phase);
				outputArray1[i] = sample * 0.6;
				outputArray2[i] = sample * 0.6;
			
				phase += phaseIncrement;
//				if(phase > kTwoPi) {
//					phase -= kTwoPi;
//				}
			}
		}
		else {
			for(var i = 0;i < n;i ++) {
				outputArray1[i] = 0;
				outputArray2[i] = 0;
			}
		}
	};
	// contextからデータをつくっていく必要がありそう。
	var phase = 0.0;
	var baseFrequency = 440.0;
	var kSampleRate = 44100;
	var kBufferSize = 1024;
	var phaseIncrement = 2.0 * Math.PI * baseFrequency / kSampleRate;
	var kTwoPi = 2.0 * Math.PI;
	var soundEnabled = false;
	
	jsProcessor = context.createJavaScriptNode(kBufferSize, 0, 2);
	jsProcessor.onaudioprocess = onAudioProcess;
	jsProcessor.connect(context.destination);
	console.log(context);
};
*/

var setup = function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
    var xhr = new goog.net.XhrIo();
    xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
    var i = 0;
    goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
      amp3 = e.target.getResponse();
      context.decodeAudioData(amp3, function(buffer){
        abuffer = buffer;
      });
    });
    xhr.send("../a.mp3");
    var xhr = new goog.net.XhrIo();
    xhr.setResponseType(goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
    var i = 0;
    goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
      bmp3 = e.target.getResponse();
      console.log(bmp3);
      context.decodeAudioData(bmp3, function(buffer){
      console.log("here...");
        bbuffer = buffer;
      });
    });
    xhr.send("../b.mp3");
};

var onload = function() {
	var pos = 0;
	var inputArray1 = abuffer.getChannelData(0);
	var inputArray2 = abuffer.getChannelData(0);
	var onAudioProcess = function(e) {
		// とまったら、それ以降のデータに0を挿入していけばよし。
		var outputArray1 = e.outputBuffer.getChannelData(0);
		var outputArray2 = e.outputBuffer.getChannelData(1);
		var n = outputArray1.length;
		for(var i = 0;i < n;i ++) {
			if(pos > inputArray1.length) {
				outputArray1[i] = 0;
				outputArray2[i] = 0;
			}
			else {
				outputArray1[i] = inputArray1[pos];
				outputArray2[i] = inputArray2[pos];
				pos ++;
			}
		}
	};
	jsProcessor = context.createJavaScriptNode(1024, 0, 2);
	jsProcessor.onaudioprocess = onAudioProcess;
	jsProcessor.connect(context.destination);
};
