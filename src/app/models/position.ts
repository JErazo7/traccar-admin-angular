export class Position{
    deviceId: number;
    lat: number;
    lon: number;

    constructor(position){
        this.deviceId = position.deviceId,
        this.lat = position.latitude,
        this.lon = position.longitude
    }
}