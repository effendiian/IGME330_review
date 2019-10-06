"use strict";
function getRandomUnitVector(){
	let x = getRandom(-1,1);
	let y = getRandom(-1,1);
	let length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else{
		x /= length;
		y /= length;
	}

	return {x:x, y:y};
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomColor(){
	const getByte = _ => 35 + Math.round(Math.random() * 220);
	return `rgba(${getByte()},${getByte()},${getByte()},1)`;
}

function max(lh, rh) {
    return (lh >= rh) ? lh : rh;  
}

function min(lh, rh){
    return (lh <= rh) ? lh : rh;
}

function clamp(value, lower, upper){
    return min(max(value, lower), upper);
}

function getElement(selector) {
    return document.querySelector(selector);
}

function formatSecondsAsTime(seconds, format) {
    let hr  = Math.floor(seconds / 3600);
    let min = Math.floor((seconds - (hr * 3600))/60);
    let sec = Math.floor(seconds - (hr * 3600) -  (min * 60));

    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }

    return min + ':' + sec;
}

function formatTime(milliseconds) {
    if(isNaN(milliseconds)){
      return '00:00';
    }
  
    return formatSecondsAsTime(Math.floor(milliseconds));
}