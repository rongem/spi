import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { View } from '../models/view.model';

export interface SharePointWebService {
    getSitesForUser(): Observable<string[]>;
    getListsForSite(site: string): Observable<List[]>;
    getViewsForList(list: List): Observable<View[]>;
    getListContent(list: List): Observable<Map<string, string>[]>;
    getViewContent(view: View): Observable<Map<string, string>[]>;
    createListEntry(entry: Map<string, string>): Observable<Map<string, string>>;
    updateListEntry(entry: Map<string, string>): Observable<Map<string, string>>;
}