"use strict";
/*
    Metadata.js - Ian Effendi
    Contains useful metadata information for the audio tracks.
*/

// Ready state values. 
// Taken from Mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
export const READY_STATE_FLAG = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
};

// Source file media prefixes.
export const MEDIA_PREFIX = {
    'AUDIO': "src/audio/",
    'IMAGE': "src/img/",
    'SCRIPT': "src/js/"
};
    
// Song list.
// Maps a keyword to each of the addresses.
export const TRACKS = {
    
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
