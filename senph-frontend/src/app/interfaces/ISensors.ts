import { ILabel } from './ILabel';

export class ISensors {
    sensor: {
        type: string,
        value: string,
    };
    sensorLabel: {
        type: string,
        value: string,
        "xml:lang": string
    };

    constructor(resSensor: any) {
        this.sensor = resSensor.sensor;
        this.sensorLabel = resSensor.sensorLabel;
    }
};