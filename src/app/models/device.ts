export class Device{
    id: Number;
    name: string;
    uniqueId: string;
    status: string;

    constructor(device){
        this.id = device.id,
        this.name = device.name,
        this.uniqueId = device.uniqueId,
        this.status = device.status
    }
}