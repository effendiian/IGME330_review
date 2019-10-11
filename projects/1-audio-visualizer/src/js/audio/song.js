"use strict";
/*
    Song.js - Ian Effendi
    Class used to represent Tracks.
*/

// Return a song's full path.
export function getPath(directory = './', song = undefined){
    if(!song || !song.filename){
        return directory;
    }
    else {
        return `${directory}${song.filename}`;   
    }    
}

// Represents a song's metadata.
export class Song {
    
    // Construct metadata for a song.
    constructor(options = {}){
        this.title = options.title || 'Track Title';
        this.artist = options.artist || 'Track Artist';
        this.album = options.album || 'Track Album';
        this.filename = options.filename || undefined;        
    }
        
}