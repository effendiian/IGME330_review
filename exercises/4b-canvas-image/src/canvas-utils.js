"use strict";
function createLinearGradient(ctx,startX,startY,endX,endY,colorStops){
	let lg = ctx.createLinearGradient(startX,startY,endX,endY);
	for(let stop of colorStops){
		lg.addColorStop(stop.percent,stop.color);
	}
	return lg;
}