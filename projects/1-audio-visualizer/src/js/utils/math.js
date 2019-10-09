"use strict";
/* 
    Math.js - Ian Effendi
    Contains math utility functions.
*/

///////////////////////
// CONSTANT WRAPPERS //

// Ratio of the circumference of a circle to its diameter, approximately 3.14159.
export const PI = Math.PI;

// Euler's constant, approxmiately 2.718.
export const E = Math.E;

// Square root of 2, approximately 1.414.
export const SQRT2 = Math.SQRT2;

/////////////////////
// METHOD WRAPPERS //

// Calculate the absolute value of a number.
export const abs = Math.abs;

// Calculate the square root of a number.
export const sqrt = Math.sqrt;

// Calculate the base raised by the exponent power.
export const pow = Math.pow;

// Calculate the cosine of a number. Expects and returns radians.
export const cos = Math.cos;

// Calculate the arccosine of a number. Expects and returns radians.
export const acos = Math.acos;

// Calculate the sin of a number. Expects and returns radians.
export const sin = Math.sin;

// Calculate the arcsin of a number. Expects and returns radians.
export const asin = Math.asin;

// Calculate the tangent of a number. Expects and returns radians.
export const tan = Math.tan;

// Calculate the arctangent of a number. Expects and returns radians.
export const atan = Math.atan;

// Calculate the arctangent of the quotient of its arguments y and x. Expects and returns radians.
export const atan2 = Math.atan2;

// Calculate the largest integer less than or equal to a number.
export const floor = Math.floor;

// Calculate the smallest integer greater than or equal to a number.
export const ceiling = Math.ceil;

// Calculate the integer part of the input number, removing any fractional digits.
export const truncate = Math.trunc;

// Round the value to the nearest integer.
export const round = Math.round;

// Returns a +/- 1 indicating the sign of the number. If the number is zero, it will return 0.
export const sign = Math.sign;

// Calculate a pseudo-random number between 0 and 1.
export const random = Math.random;

// Returns the largest of zero or more numbers.
export const max = Math.max;

// Returns the smallest of zero or more numbers.
export const min = Math.min;

//////////////////////
// EXPORT FUNCTIONS //

// Convert input angle in degrees to radians.
export function deg2rad(theta) {
    return theta * (PI / 180);
}

// Convert input angle in radians to degrees.
export function rad2deg(theta) {
    return theta * (180 / PI);
}

// Clamp input value between lower and upper bounds.
export function clamp(value, lower, upper){
    return min(max(value, lower), upper);
}

// Get random value between lower (inclusive) and upper (exclusive) bounds.
export function getRandom(lower, upper){
    return random() * (upper - lower) + lower;    
}

// Get a random byte value.
export function getRandomByte(){
    return round(getRandom(0, 256));
}

// Get random unit vector.
export function getRandomUnitVector() {
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

// Calculate the greatest common denominator.
export function gcd() {
    if(arguments.length == 2){
        if(arguments[1] == 0){
            return arguments[0];
        }
        else 
        {
            return gcd(arguments[1], arguments[0] % arguments[1]);
        }
    } else if(arguments.length > 2) {
        let result = gcd(arguments[0], arguments[1]);
        for(let i = 2; i < arguments.length; i++){
            result = gcd(result, arguments[i]);
        }
        return result;
    }
}

