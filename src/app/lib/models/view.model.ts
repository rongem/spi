import { Column } from './column.model';
import { List } from './list.model';

// SharePoint-Ansicht einer Liste, mit einer Id, einem Namen, der Liste, zu der sie gehört, und den angezeigten Spalten
export class View{
    constructor(public id: string, public name: string, public list: List, public columns: Column[]) {}
}
