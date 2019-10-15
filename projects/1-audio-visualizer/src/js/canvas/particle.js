"use strict";
/*
    Particle.js - Ian Effendi
    Particles used to display graphics for a set amount of time.
*/

// Import statement.
import {
    Vector2 as vec2
} from './../utils/vector.js';

// Default settings.
const ParticleSettings = {
    DEFAULT_LIFETIME: 10, // Time in seconds.   
};

// Particle class.
export class Particle {
    
    // Construct the particle.
    constructor(options = {}){
        this.lifetime = options.lifetime || ParticleSettings.DEFAULT_LIFETIME;
        this.position  = options.position || new vec2(0, 0);
        this.velocity = options.velocity || new vec2(0, 0);
        this.acceleration = options.acceleration || new vec2(0, 0);
    }
    
    // Update the particle.
    update(deltaTime){
        console.log(`[Particle] Time since last frame: ${deltaTime} seconds.`);
    }
    
}