// SharePoint-Spaltendefinition, mit einer Id (ggf. der Position in der Reihenfolge), einem internen Namen und einem optionalen Anzeigenamen
export class Column {
    constructor(public id: string, public internalName: string, public displayName: string = internalName) {}
}