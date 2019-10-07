"use strict";
/* 
    Song.js
    Ian Effendi
    
    Used to encapsulate track information and addresses.
*/

// Contains track info and source address.
class Song {

    // Create a song reference.
    constructor(options = {}) {
        this.title = options.title || 'Track Title';
        this.artist = options.artist || 'Track Artist';
        this.album = options.album || 'Track Album';
        this.filename = options.filename || undefined;
    }

    // Get the full address.
    getAddress() {
        return `${MEDIA_PREFIX['AUDIO']}${this.filename}`;
    }

}

// Song list.
// Maps a keyword to each of the addresses.
const TRACKS = {
    
    // Down in New Orleans - Dr. John - The Princess and the Frog
    'DOWN': new Song({
        title: "Down in New Orleans",
        artist: "Dr. John",
        album: "The Princess and the Frog",
        filename: "Down%20in%20New%20Orleans%20(From%20'The%20Princess%20and%20the%20Frog'%20Soundtrack)%20-%20Dr.%20John.mp3"
    }),
    
    // Every Note - Mystery Skulls - Forver
    'EVERY': new Song({
        title: "Every Note",
        artist: "Mystery Skulls",
        album: "Forever",
        filename: "Every%20Note%20(Pre-Album)%20-%20Mystery%20Skulls.mp3"
    }),
    
    'HAPPILY': new Song({   
        title: "Happily Ever After",
        artist: "Steven Universe",
        album: "Steven Universe The Movie",     
        filename: "Happily%20Ever%20After%20-%20Steven%20Universe.mp3"
    }),
    
    'FRIENDS': new Song({
        title: "Other Friends (Khamydrian Remix)",
        artist: "Steven Universe",
        album: "Steven Universe The Movie",
        filename: "Other%20Friends%20(Khamydrian%20Remix)%20-%20Steven%20Universe.mp3"
    }),
    
    'TEMPO': new Song({
        title: "Tempo",
        artist: "EXO",
        album: "Don't Mess Up My Tempo",
        filename: "Tempo%20-%20EXO.mp3"
    }),
    
    'LOVE': new Song({
        title: "True Kinda Love",
        artist: "Steven Universe",
        album: "Steven Universe The Movie",
        filename: "True%20Kinda%20Love%20-%20Steven%20Universe.mp3"
    })
};
