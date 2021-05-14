import { Column } from './column.model';

// SharePoint-App (Liste oder Dokumentenbibliothek) mit einer Id, einem Namen und der Site, auf der die Liste existiert, und den Spaltendefinitionen
export class List{
    constructor(public id: string, public name: string, public site: string, public columns: Column[]) {}
}
