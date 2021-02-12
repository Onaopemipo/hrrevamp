export class MyColor {
    private red = 0;
    private blue = 0;
    private green = 0;
    private alpha = 1;
    public constructor(red, green, blue, alpha = 1) {
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.alpha = alpha;
    }

    public getColorString(opacity) {
        this.alpha = opacity;
        return `RGBA(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}

export interface IStatus {
    getStatusLabel(): string;
    getStatusColor(): MyColor;
}
