export class Row {
    working = false;
    success = false;
    error = false;
    errors = new Map<string, string>();
    constructor(public cells:Map<string, string>) {}
}