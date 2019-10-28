"use strict";

export class MarkerData {

    constructor(title, latitude = 0, longitude = 0) {
        this.title = title || "Untitled";
        this.position = {
            lat: latitude,
            lng: longitude
        }
    }

}
