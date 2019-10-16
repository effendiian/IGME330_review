"use strict";
/*
    Vector.js - Ian Effendi
    Class representing vector objects.
*/

import * as math from './../utils/math.js';

// General vector class.
export class Vector {

    // Construct vector with set number of elements.
    constructor(size) {
        this.length = size;
    }
}

// 2-dimensional vector.
export class Vector2 extends Vector {

    // Construct a 2-dimensional vector.
    constructor(x, y) {
        super(2);
        this.x = x || 0;
        this.y = y || 0;
    }

    // Get the data as an array.
    getData() {
        return [this.x, this.y];
    }

    // Calculate sum between vectors.
    add(vec2) {
        if (this.length != vec.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec2.getData();

            for (let i = 0; i < data.length; i++) {
                data[i] = data[i] + other[i];
            }

            return new Vector2(data[0], data[1]);
        }
    }

    // Calculate the scale of the vector.
    mult(scale) {
        // Get current data.
        let data = this.getData();
        return new Vector2(data[0] * scale, data[1] * scale);
    }

    // Calculate the dot product.
    dot(vec) {
        if (this.length != vec.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec.getData();

            let dot = 0;
            for (let i = 0; i < data.length; i++) {
                dot += data[i] * other[i];
            }

            return dot;
        }
    }
}

// 3-dimensional vector.
export class Vector3 extends Vector {

    // Construct a 3-dimensional vector.
    constructor(x, y, z) {
        super(3);
        this.z = z || 0;
    }

    // Get the data as an array.
    getData() {
        return [this.x, this.y, this.z];
    }

    // Calculate sum between vectors.
    add(vec3) {
        if (this.length != vec.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec3.getData();

            for (let i = 0; i < data.length; i++) {
                data[i] = data[i] + other[i];
            }

            return new Vector3(data[0], data[1], data[2]);
        }
    }

    // Calculate the scale of the vector.
    mult(scale) {
        // Get current data.
        let data = this.getData();
        return new Vector3(
            data[0] * scale,
            data[1] * scale,
            data[2] * scale);
    }

    // Calculate the dot product.
    dot(vec) {
        if (this.length != vec.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec.getData();

            let dot = 0;
            for (let i = 0; i < data.length; i++) {
                dot += data[i] * other[i];
            }

            return dot;
        }
    }
}

// 4-dimensional vector.
export class Vector4 extends Vector {

    // Construct a 4-dimensional vector.
    constructor(x, y, z, w) {
        super(4);
        this.w = w || 0;
    }

    // Get the data as an array.
    getData() {
        return [this.x, this.y, this.z, this.w];
    }

    // Calculate sum between vectors.
    add(vec4) {
        if (this.length != vec4.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec4.getData();

            for (let i = 0; i < data.length; i++) {
                data[i] = data[i] + other[i];
            }

            return new Vector4(data[0], data[1], data[2], data[4]);
        }
    }

    // Calculate the scale of the vector.
    mult(scale) {
        // Get current data.
        let data = this.getData();
        return new Vector4(
            data[0] * scale,
            data[1] * scale,
            data[2] * scale,
            data[3] * scale);
    }

    // Calculate the dot product.
    dot(vec) {
        if (this.length != vec.length) {
            return undefined;
        } else {
            // Get the current data.
            let data = this.getData();
            let other = vec.getData();

            let dot = 0;
            for (let i = 0; i < data.length; i++) {
                dot += data[i] * other[i];
            }

            return dot;
        }
    }
}
