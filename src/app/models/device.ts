export class Device{
    name: string;
    uniqueid: string;
    status: string;

    constructor(device){
        this.name = device.name,
        this.uniqueid = device.uniqueid,
        this.status = device.status
    }
}